/**
 * Minimal QR code encoder: byte mode, error-correction level M, versions 1–6
 * (up to 108 bytes of UTF-8). Dependency-free; follows ISO/IEC 18004 the same way
 * the reference implementations do (Reed–Solomon over GF(256) with 0x11D, the
 * standard placement/zigzag, all eight masks scored by the four penalty rules).
 *
 * Self-check (vitest-style; verified during development):
 *   // Reed–Solomon, v1-M data codewords for "HELLO WORLD"; expected EC cross-checked
 *   // against the reedsolo library (RSCodec(10, fcr=0, prim=0x11D)):
 *   const data = [0x20,0x5b,0x0b,0x78,0xd1,0x72,0xdc,0x4d,0x43,0x40,0xec,0x11,0xec,0x11,0xec,0x11];
 *   expect(rsRemainder(data, 10)).toEqual([0xc4,0x23,0x27,0x77,0xeb,0xd7,0xe7,0xe2,0x5d,0x17]);
 *   // Whole-symbol check: encodeQr("https://www.robogyan.tech/alumni/2024-25") is
 *   // module-for-module identical to python-qrcode's output (byte mode, level M), and
 *   // strings spanning versions 1–6 were rendered to bitmaps and decoded back with
 *   // OpenCV's QRCodeDetector.
 */

export interface QrMatrix {
  /** Side length in modules (21 for version 1, +4 per version). */
  size: number;
  /** modules[row][col]: true = dark. */
  modules: boolean[][];
}

/** Level M: [total codewords, EC codewords per block, number of blocks] for versions 1–6. */
const EC_M: ReadonlyArray<readonly [total: number, ecPerBlock: number, blocks: number]> = [
  [26, 10, 1],
  [44, 16, 1],
  [70, 26, 1],
  [100, 18, 2],
  [134, 24, 2],
  [172, 16, 4],
];

// ---------- GF(256) arithmetic ----------

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255] ?? 0;
})();

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[(LOG[a] ?? 0) + (LOG[b] ?? 0)] ?? 0;
}

/** Reed–Solomon remainder: `degree` error-correction codewords for `data`. */
export function rsRemainder(data: readonly number[], degree: number): number[] {
  // Generator polynomial: product of (x - α^i) for i in 0..degree-1.
  let gen: number[] = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      next[j] = (next[j] ?? 0) ^ (gen[j] ?? 0);
      next[j + 1] = (next[j + 1] ?? 0) ^ gfMul(gen[j] ?? 0, EXP[i] ?? 0);
    }
    gen = next;
  }
  const rem = new Array<number>(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ (rem.shift() ?? 0);
    rem.push(0);
    for (let j = 0; j < degree; j++) rem[j] = (rem[j] ?? 0) ^ gfMul(gen[j + 1] ?? 0, factor);
  }
  return rem;
}

// ---------- Bit stream ----------

class BitBuffer {
  bits: number[] = [];
  push(value: number, length: number) {
    for (let i = length - 1; i >= 0; i--) this.bits.push((value >>> i) & 1);
  }
}

/** Lowest version (1–6) whose level-M data capacity fits `byteCount`; null if none. */
function chooseVersion(byteCount: number): number | null {
  for (let v = 1; v <= 6; v++) {
    const [total, ecPerBlock, blocks] = EC_M[v - 1] ?? [0, 0, 0];
    const dataCodewords = total - ecPerBlock * blocks;
    // mode (4 bits) + count (8 bits) + data must fit; the terminator may be shortened.
    if (byteCount + 2 <= dataCodewords) return v;
  }
  return null;
}

function buildCodewords(bytes: number[], version: number): number[] {
  const [total, ecPerBlock, blocks] = EC_M[version - 1] ?? [0, 0, 0];
  const dataCount = total - ecPerBlock * blocks;
  const bb = new BitBuffer();
  bb.push(0b0100, 4); // byte mode
  bb.push(bytes.length, 8); // character count (8 bits for versions 1–9)
  for (const b of bytes) bb.push(b, 8);
  const capacity = dataCount * 8;
  bb.push(0, Math.min(4, capacity - bb.bits.length)); // terminator
  while (bb.bits.length % 8 !== 0) bb.bits.push(0);
  const pads = [0xec, 0x11];
  for (let i = 0; bb.bits.length < capacity; i++) bb.push(pads[i % 2] ?? 0, 8);

  const data: number[] = [];
  for (let i = 0; i < bb.bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | (bb.bits[i + j] ?? 0);
    data.push(byte);
  }

  // Split into blocks (short blocks first), compute EC, then interleave.
  const shortBlocks = blocks - (total % blocks);
  const shortLen = Math.floor(total / blocks) - ecPerBlock;
  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];
  let k = 0;
  for (let i = 0; i < blocks; i++) {
    const len = shortLen + (i < shortBlocks ? 0 : 1);
    const block = data.slice(k, k + len);
    k += len;
    dataBlocks.push(block);
    ecBlocks.push(rsRemainder(block, ecPerBlock));
  }
  const out: number[] = [];
  const maxLen = Math.max(...dataBlocks.map((b) => b.length));
  for (let i = 0; i < maxLen; i++)
    for (const b of dataBlocks) if (i < b.length) out.push(b[i] ?? 0);
  for (let i = 0; i < ecPerBlock; i++) for (const b of ecBlocks) out.push(b[i] ?? 0);
  return out;
}

// ---------- Matrix ----------

function makeGrid(size: number): boolean[][] {
  return Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
}

function placeFunctionPatterns(
  version: number,
  modules: boolean[][],
  isFunction: boolean[][],
): void {
  const size = modules.length;
  const set = (row: number, col: number, dark: boolean) => {
    if (row < 0 || col < 0 || row >= size || col >= size) return;
    (modules[row] ?? [])[col] = dark;
    (isFunction[row] ?? [])[col] = true;
  };

  // Finder patterns with separators.
  for (const [r0, c0] of [
    [0, 0],
    [0, size - 7],
    [size - 7, 0],
  ] as const) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const d = Math.max(Math.abs(r - 3), Math.abs(c - 3));
        set(r0 + r, c0 + c, d !== 2 && d !== 4);
      }
    }
  }

  // Timing patterns.
  for (let i = 8; i < size - 8; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }

  // Single alignment pattern (versions 2–6) centred at (size-7, size-7).
  if (version >= 2) {
    const c = size - 7;
    for (let r = -2; r <= 2; r++)
      for (let k = -2; k <= 2; k++) set(c + r, c + k, Math.max(Math.abs(r), Math.abs(k)) !== 1);
  }

  // Reserve the format-info areas (filled in per mask) and the always-dark module.
  // Index 6 is the timing pattern crossing, already placed above.
  for (let i = 0; i < 9; i++) {
    if (i === 6) continue;
    set(8, i, false);
    set(i, 8, false);
  }
  for (let i = 0; i < 8; i++) {
    set(8, size - 1 - i, false);
    set(size - 1 - i, 8, false);
  }
  set(size - 8, 8, true);
}

function placeFormatInfo(modules: boolean[][], mask: number): void {
  const size = modules.length;
  // Level M = 00, then the 3 mask bits; BCH(15,5) remainder; XOR mask 0x5412.
  const data = (0b00 << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  const bits = ((data << 10) | rem) ^ 0x5412;
  const bit = (i: number) => ((bits >>> i) & 1) === 1;
  const set = (row: number, col: number, dark: boolean) => {
    (modules[row] ?? [])[col] = dark;
  };
  // First copy, around the top-left finder.
  for (let i = 0; i <= 5; i++) set(i, 8, bit(i));
  set(7, 8, bit(6));
  set(8, 8, bit(7));
  set(8, 7, bit(8));
  for (let i = 9; i < 15; i++) set(8, 14 - i, bit(i));
  // Second copy, split between the other two finders.
  for (let i = 0; i < 8; i++) set(8, size - 1 - i, bit(i));
  for (let i = 8; i < 15; i++) set(size - 15 + i, 8, bit(i));
  set(size - 8, 8, true);
}

function placeData(codewords: number[], modules: boolean[][], isFunction: boolean[][]): void {
  const size = modules.length;
  let i = 0;
  const totalBits = codewords.length * 8;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const col = right - j;
        const upward = ((right + 1) & 2) === 0;
        const row = upward ? size - 1 - vert : vert;
        if (!(isFunction[row] ?? [])[col] && i < totalBits) {
          const byte = codewords[i >>> 3] ?? 0;
          (modules[row] ?? [])[col] = ((byte >>> (7 - (i & 7))) & 1) === 1;
          i++;
        }
      }
    }
  }
}

function maskBit(mask: number, row: number, col: number): boolean {
  switch (mask) {
    case 0:
      return (row + col) % 2 === 0;
    case 1:
      return row % 2 === 0;
    case 2:
      return col % 3 === 0;
    case 3:
      return (row + col) % 3 === 0;
    case 4:
      return (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
    case 5:
      return ((row * col) % 2) + ((row * col) % 3) === 0;
    case 6:
      return (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
    default:
      return (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
  }
}

function applyMask(mask: number, modules: boolean[][], isFunction: boolean[][]): void {
  const size = modules.length;
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!(isFunction[r] ?? [])[c] && maskBit(mask, r, c))
        (modules[r] ?? [])[c] = !(modules[r] ?? [])[c];
}

/** The four penalty rules (runs, 2×2 blocks, finder-like patterns, dark balance). */
function penalty(modules: boolean[][]): number {
  const size = modules.length;
  let score = 0;
  const line = (get: (i: number) => boolean) => {
    let run = 1;
    let s = "";
    for (let i = 0; i < size; i++) {
      const v = get(i);
      s += v ? "1" : "0";
      if (i > 0 && v === get(i - 1)) {
        run++;
        if (run === 5) score += 3;
        else if (run > 5) score += 1;
      } else run = 1;
    }
    for (const pat of ["00001011101", "10111010000"]) {
      let idx = s.indexOf(pat);
      while (idx !== -1) {
        score += 40;
        idx = s.indexOf(pat, idx + 1);
      }
    }
  };
  for (let r = 0; r < size; r++) line((i) => (modules[r] ?? [])[i] ?? false);
  for (let c = 0; c < size; c++) line((i) => (modules[i] ?? [])[c] ?? false);
  let dark = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const v = (modules[r] ?? [])[c] ?? false;
      if (v) dark++;
      if (
        r + 1 < size &&
        c + 1 < size &&
        v === (modules[r] ?? [])[c + 1] &&
        v === (modules[r + 1] ?? [])[c] &&
        v === (modules[r + 1] ?? [])[c + 1]
      )
        score += 3;
    }
  }
  const total = size * size;
  const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
  score += 10 * k;
  return score;
}

/**
 * Encode `text` as a level-M QR symbol. Returns null when the text needs more than
 * version 6 (108 bytes), so callers can fall back to showing the plain link.
 */
export function encodeQr(text: string): QrMatrix | null {
  const bytes = [...new TextEncoder().encode(text)];
  const version = chooseVersion(bytes.length);
  if (version === null) return null;
  const size = version * 4 + 17;
  const codewords = buildCodewords(bytes, version);

  const base = makeGrid(size);
  const isFunction = makeGrid(size);
  placeFunctionPatterns(version, base, isFunction);
  placeData(codewords, base, isFunction);

  let best: boolean[][] | null = null;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    const trial = base.map((row) => [...row]);
    applyMask(mask, trial, isFunction);
    placeFormatInfo(trial, mask);
    const s = penalty(trial);
    if (s < bestScore) {
      bestScore = s;
      best = trial;
    }
  }
  return { size, modules: best ?? base };
}

/** SVG path data for the dark modules, one unit per module ("M3 0h4v1h-4z…"). */
export function qrPath(qr: QrMatrix): string {
  const parts: string[] = [];
  for (let r = 0; r < qr.size; r++) {
    const row = qr.modules[r] ?? [];
    let c = 0;
    while (c < qr.size) {
      if (!row[c]) {
        c++;
        continue;
      }
      let w = 1;
      while (c + w < qr.size && row[c + w]) w++;
      parts.push(`M${c} ${r}h${w}v1h-${w}z`);
      c += w;
    }
  }
  return parts.join("");
}
