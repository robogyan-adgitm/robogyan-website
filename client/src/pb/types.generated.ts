/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export const Collections = {
	Authorigins: "_authOrigins",
	Externalauths: "_externalAuths",
	Mfas: "_mfas",
	Otps: "_otps",
	Superusers: "_superusers",
	Alumni: "alumni",
	AlumniBatches: "alumni_batches",
	Events: "events",
	Facts: "facts",
	Gallery: "gallery",
	GateCards: "gate_cards",
	GateCodes: "gate_codes",
	GateSettings: "gate_settings",
	GateSyncs: "gate_syncs",
	Projects: "projects",
	SihFaq: "sih_faq",
	SihJudges: "sih_judges",
	SihPptGuide: "sih_ppt_guide",
	SihProblemStatements: "sih_problem_statements",
	SihResults: "sih_results",
	SihThemes: "sih_themes",
	SihTimeline: "sih_timeline",
	SiteSettings: "site_settings",
	TeamMembers: "team_members",
	Users: "users",
} as const
export type Collections = typeof Collections[keyof typeof Collections]

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type AlumniRecord = {
	batch: RecordIdString
	created: IsoAutoDateString
	current_company?: string
	current_role?: string
	github?: string
	id: string
	image?: FileNameString
	linkedin?: string
	name: string
	position?: string
	sort?: number
	twitter?: string
	updated: IsoAutoDateString
}

export type AlumniBatchesRecord<Tachievements = unknown> = {
	achievements?: null | Tachievements
	created: IsoAutoDateString
	description?: string
	id: string
	image?: FileNameString
	sort?: number
	subtitle?: string
	updated: IsoAutoDateString
	year: string
}

export const EventsTypeOptions = {
	"Workshop": "Workshop",
	"Hackathon": "Hackathon",
	"Competition": "Competition",
	"Interviews": "Interviews",
	"Event": "Event",
} as const
export type EventsTypeOptions = typeof EventsTypeOptions[keyof typeof EventsTypeOptions]

export const EventsStatusOptions = {
	"Open": "Open",
	"Live": "Live",
	"Ended": "Ended",
	"Upcoming": "Upcoming",
} as const
export type EventsStatusOptions = typeof EventsStatusOptions[keyof typeof EventsStatusOptions]
export type EventsRecord = {
	created: IsoAutoDateString
	date?: string
	description?: string
	end_date?: string
	id: string
	image?: FileNameString
	name: string
	prize_pool?: string
	registration_url?: string
	sort?: number
	status: EventsStatusOptions
	time?: string
	type: EventsTypeOptions
	upcoming?: boolean
	updated: IsoAutoDateString
	venue?: string
}

export const FactsSourceOptions = {
	"site": "site",
	"instagram": "instagram",
	"facebook": "facebook",
	"linkedin": "linkedin",
	"youtube": "youtube",
	"web": "web",
} as const
export type FactsSourceOptions = typeof FactsSourceOptions[keyof typeof FactsSourceOptions]
export type FactsRecord = {
	created: IsoAutoDateString
	id: string
	key?: string
	sort?: number
	source: FactsSourceOptions
	text: string
	updated: IsoAutoDateString
	url?: string
	year?: number
}

export type GalleryRecord<Tmeta = unknown> = {
	caption?: string
	category?: string
	created: IsoAutoDateString
	description?: string
	id: string
	image?: FileNameString
	meta?: null | Tmeta
	sort?: number
	updated: IsoAutoDateString
}

export type GateCardsRecord = {
	created: IsoAutoDateString
	enabled?: boolean
	id: string
	name: string
	notes?: string
	on_gate?: boolean
	synced_at?: IsoDateString
	uid: string
	updated: IsoAutoDateString
	user?: RecordIdString
}

export const GateCodesPurposeOptions = {
	"self": "self",
	"share": "share",
} as const
export type GateCodesPurposeOptions = typeof GateCodesPurposeOptions[keyof typeof GateCodesPurposeOptions]
export type GateCodesRecord = {
	created: IsoAutoDateString
	expires_at: IsoDateString
	id: string
	label?: string
	purpose: GateCodesPurposeOptions
	ts: number
	updated: IsoAutoDateString
	user: RecordIdString
}

export type GateSettingsRecord = {
	created: IsoAutoDateString
	id: string
	updated: IsoAutoDateString
	validity_seconds: number
}

export type GateSyncsRecord<Tsummary = unknown> = {
	created: IsoAutoDateString
	firmware?: string
	id: string
	summary?: null | Tsummary
	updated: IsoAutoDateString
	user: RecordIdString
}

export const ProjectsStatusOptions = {
	"Active": "Active",
	"Completed": "Completed",
	"Development": "Development",
	"Research": "Research",
	"Beta": "Beta",
} as const
export type ProjectsStatusOptions = typeof ProjectsStatusOptions[keyof typeof ProjectsStatusOptions]

export const ProjectsCategoryOptions = {
	"Hardware": "Hardware",
	"Software": "Software",
	"Mixed": "Mixed",
	"AI-ML": "AI-ML",
	"Robotics": "Robotics",
	"IoT": "IoT",
} as const
export type ProjectsCategoryOptions = typeof ProjectsCategoryOptions[keyof typeof ProjectsCategoryOptions]
export type ProjectsRecord<Ttech_stack = unknown> = {
	category: ProjectsCategoryOptions
	created: IsoAutoDateString
	docs_url?: string
	end_date?: string
	id: string
	image?: FileNameString
	name: string
	sort?: number
	start_date?: string
	status: ProjectsStatusOptions
	tech_stack?: null | Ttech_stack
	updated: IsoAutoDateString
}

export type SihFaqRecord = {
	answer?: string
	category?: string
	created: IsoAutoDateString
	id: string
	question: string
	sort?: number
	updated: IsoAutoDateString
}

export type SihJudgesRecord = {
	affiliation?: string
	created: IsoAutoDateString
	designation?: string
	id: string
	image?: FileNameString
	name: string
	quote?: string
	role?: string
	sort?: number
	updated: IsoAutoDateString
}

export type SihPptGuideRecord<Tkey_points = unknown> = {
	created: IsoAutoDateString
	id: string
	key_points?: null | Tkey_points
	pro_tip?: string
	slide_number: number
	subtitle?: string
	title: string
	updated: IsoAutoDateString
}

export type SihProblemStatementsRecord<Ttech_stack = unknown> = {
	category?: string
	created: IsoAutoDateString
	description?: string
	domain?: string
	id: string
	organization?: string
	ps_number: string
	tech_stack?: null | Ttech_stack
	theme?: string
	title: string
	updated: IsoAutoDateString
}

export const SihResultsStatusOptions = {
	"Selected": "Selected",
	"Waitlisted": "Waitlisted",
} as const
export type SihResultsStatusOptions = typeof SihResultsStatusOptions[keyof typeof SihResultsStatusOptions]
export type SihResultsRecord = {
	created: IsoAutoDateString
	id: string
	leader_name?: string
	s_no: number
	status: SihResultsStatusOptions
	team_name: string
	updated: IsoAutoDateString
}

export type SihThemesRecord = {
	category?: string
	color?: string
	created: IsoAutoDateString
	description?: string
	icon_name?: string
	id: string
	name: string
	updated: IsoAutoDateString
}

export const SihTimelineStatusOptions = {
	"Upcoming": "Upcoming",
	"Live": "Live",
	"Completed": "Completed",
} as const
export type SihTimelineStatusOptions = typeof SihTimelineStatusOptions[keyof typeof SihTimelineStatusOptions]
export type SihTimelineRecord<Tdetails = unknown> = {
	created: IsoAutoDateString
	date?: string
	description?: string
	details?: null | Tdetails
	id: string
	phase?: string
	sort?: number
	status?: SihTimelineStatusOptions
	title: string
	updated: IsoAutoDateString
}

export type SiteSettingsRecord = {
	address?: string
	contact_email?: string
	created: IsoAutoDateString
	github?: string
	id: string
	instagram?: string
	join_url?: string
	linkedin?: string
	sih_results_out?: boolean
	tagline?: string
	updated: IsoAutoDateString
	youtube?: string
}

export const TeamMembersRingOptions = {
	"cyan": "cyan",
	"violet": "violet",
	"indigo": "indigo",
	"mint": "mint",
	"none": "none",
} as const
export type TeamMembersRingOptions = typeof TeamMembersRingOptions[keyof typeof TeamMembersRingOptions]

export const TeamMembersSectionOptions = {
	"president": "president",
	"vice_president": "vice_president",
	"lead": "lead",
	"core": "core",
} as const
export type TeamMembersSectionOptions = typeof TeamMembersSectionOptions[keyof typeof TeamMembersSectionOptions]
export type TeamMembersRecord<Ttech_stack = unknown> = {
	active?: boolean
	bio?: string
	created: IsoAutoDateString
	email?: string
	github?: string
	id: string
	image?: FileNameString
	instagram?: string
	linkedin?: string
	name: string
	period?: string
	phone?: string
	position?: string
	ring?: TeamMembersRingOptions
	section: TeamMembersSectionOptions
	sort?: number
	tech_stack?: null | Ttech_stack
	updated: IsoAutoDateString
}

export const UsersRoleOptions = {
	"pending": "pending",
	"member": "member",
	"admin": "admin",
	"owner": "owner",
} as const
export type UsersRoleOptions = typeof UsersRoleOptions[keyof typeof UsersRoleOptions]
export type UsersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	member_of?: RecordIdString
	name?: string
	notes?: string
	password: string
	password_set?: boolean
	role: UsersRoleOptions
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type AlumniResponse<Texpand = unknown> = Required<AlumniRecord> & BaseSystemFields<Texpand>
export type AlumniBatchesResponse<Tachievements = unknown, Texpand = unknown> = Required<AlumniBatchesRecord<Tachievements>> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type FactsResponse<Texpand = unknown> = Required<FactsRecord> & BaseSystemFields<Texpand>
export type GalleryResponse<Tmeta = unknown, Texpand = unknown> = Required<GalleryRecord<Tmeta>> & BaseSystemFields<Texpand>
export type GateCardsResponse<Texpand = unknown> = Required<GateCardsRecord> & BaseSystemFields<Texpand>
export type GateCodesResponse<Texpand = unknown> = Required<GateCodesRecord> & BaseSystemFields<Texpand>
export type GateSettingsResponse<Texpand = unknown> = Required<GateSettingsRecord> & BaseSystemFields<Texpand>
export type GateSyncsResponse<Tsummary = unknown, Texpand = unknown> = Required<GateSyncsRecord<Tsummary>> & BaseSystemFields<Texpand>
export type ProjectsResponse<Ttech_stack = unknown, Texpand = unknown> = Required<ProjectsRecord<Ttech_stack>> & BaseSystemFields<Texpand>
export type SihFaqResponse<Texpand = unknown> = Required<SihFaqRecord> & BaseSystemFields<Texpand>
export type SihJudgesResponse<Texpand = unknown> = Required<SihJudgesRecord> & BaseSystemFields<Texpand>
export type SihPptGuideResponse<Tkey_points = unknown, Texpand = unknown> = Required<SihPptGuideRecord<Tkey_points>> & BaseSystemFields<Texpand>
export type SihProblemStatementsResponse<Ttech_stack = unknown, Texpand = unknown> = Required<SihProblemStatementsRecord<Ttech_stack>> & BaseSystemFields<Texpand>
export type SihResultsResponse<Texpand = unknown> = Required<SihResultsRecord> & BaseSystemFields<Texpand>
export type SihThemesResponse<Texpand = unknown> = Required<SihThemesRecord> & BaseSystemFields<Texpand>
export type SihTimelineResponse<Tdetails = unknown, Texpand = unknown> = Required<SihTimelineRecord<Tdetails>> & BaseSystemFields<Texpand>
export type SiteSettingsResponse<Texpand = unknown> = Required<SiteSettingsRecord> & BaseSystemFields<Texpand>
export type TeamMembersResponse<Ttech_stack = unknown, Texpand = unknown> = Required<TeamMembersRecord<Ttech_stack>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	alumni: AlumniRecord
	alumni_batches: AlumniBatchesRecord
	events: EventsRecord
	facts: FactsRecord
	gallery: GalleryRecord
	gate_cards: GateCardsRecord
	gate_codes: GateCodesRecord
	gate_settings: GateSettingsRecord
	gate_syncs: GateSyncsRecord
	projects: ProjectsRecord
	sih_faq: SihFaqRecord
	sih_judges: SihJudgesRecord
	sih_ppt_guide: SihPptGuideRecord
	sih_problem_statements: SihProblemStatementsRecord
	sih_results: SihResultsRecord
	sih_themes: SihThemesRecord
	sih_timeline: SihTimelineRecord
	site_settings: SiteSettingsRecord
	team_members: TeamMembersRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	alumni: AlumniResponse
	alumni_batches: AlumniBatchesResponse
	events: EventsResponse
	facts: FactsResponse
	gallery: GalleryResponse
	gate_cards: GateCardsResponse
	gate_codes: GateCodesResponse
	gate_settings: GateSettingsResponse
	gate_syncs: GateSyncsResponse
	projects: ProjectsResponse
	sih_faq: SihFaqResponse
	sih_judges: SihJudgesResponse
	sih_ppt_guide: SihPptGuideResponse
	sih_problem_statements: SihProblemStatementsResponse
	sih_results: SihResultsResponse
	sih_themes: SihThemesResponse
	sih_timeline: SihTimelineResponse
	site_settings: SiteSettingsResponse
	team_members: TeamMembersResponse
	users: UsersResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
