export interface AlumniMember {
  id: string;
  name: string;
  position: string;
  currentCompany: string;
  currentRole: string;
  image: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface AlumniBatch {
  year: string;
  subtitle: string;
  description: string;
  image: string;
  members: AlumniMember[];
  achievements: string[];
}

export const alumniBatches: AlumniBatch[] = [
  {
    year: "2024-25",
    subtitle: "Core of 2024-25",
    description: "Meet the innovative team members who made their mark this year.",
    image: "/src/data/images/alumni/rg202425.png",
    achievements: ["SIH2024 Grand Finalists", "Winners @IITK Techkriti", "Xylem International Winners"],
    members: [
      {
        id: "1",
        name: "Vidhi Gupta",
        position: "President",
        currentCompany: "Veripoint Technologies",
        currentRole: "Data Research Analyst",
        image: "/src/data/images/alumni/vidhi.png",
        linkedin: "https://www.linkedin.com/in/vidhi2410/",
      },
      {
        id: "2",
        name: "Jayam Shrivastav",
        position: "Vice-President",
        currentCompany: "Finkeda",
        currentRole: "Technology Trainee",
        image: "/src/data/images/alumni/jayam.jpg",
        linkedin: "https://www.linkedin.com/in/jayamshrivastav-dev/",
      },
      {
        id: "3",
        name: "Amogh Saxena",
        position: "Software Lead",
        currentCompany: "Pre final year",
        currentRole: "Btech CSE",
        image: "/src/data/images/alumni/amogh.jpg",
        linkedin: "https://www.linkedin.com/in/amogh-saxena-aa497a289/",
      },
      {
        id: "4",
        name: "Macle (Aditya Goel)",
        position: "Hardware Lead",
        currentCompany: "Pre final year",
        currentRole: "Btech CSE",
        image: "/src/data/images/alumni/macle.png",
        linkedin: "https://www.linkedin.com/in/macle57/",
      },
      {
        id: "5",
        name: "Deep Jyoti",
        position: "Graphics Lead",
        currentCompany: "Pre final year",
        currentRole: "Btech CSE",
        image: "/src/data/images/alumni/dj.jpg",
        linkedin: "https://www.linkedin.com/in/deep-jyoti-das-4148bb31a/",
      }
    ],
  },
  {
    year: "2023-24",
    subtitle: "Core of 2023-24",
    description: "Meet the innovative team members who made their mark this year",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&crop=faces",
    achievements: ["Xylem Gobal Winners", "Techkriti IITK Winners", "SIH 2023 Semi Finalists"],
    members: [
      {
        id: "6",
        name: "Ashish",
        position: "President",
        currentCompany: "Ministry of Science and Technology",
        currentRole: "Project Associate",
        image: "/src/data/images/alumni/ashish.jpg",
        linkedin: "https://www.linkedin.com/in/ashishhhh/",
      },
      {
        id: "7",
        name: "Sushant",
        position: "Vice President",
        currentCompany: "Final Year",
        currentRole: "M.tech, NSUT",
        image: "/src/data/images/alumni/sushant.png",
        linkedin: "https://www.linkedin.com/in/sushant-kumar-11a242225/",
      },
      {
        id: "8",
        name: "Vidhi Gupta",
        position: "Women in Tech",
        currentCompany: "Veripoint Technologies",
        currentRole: "Data Research Analyst",
        image: "/src/data/images/alumni/vidhi.png",
        linkedin: "https://www.linkedin.com/in/vidhi2410/",
      },
      {
        id: "9",
        name: "Sumit kumar",
        position: "Embedded lead",
        currentCompany: "NA",
        currentRole: "NA",
        image: "/src/data/images/alumni/sumit.png",
        linkedin: "NA",
      },
      {
        id: "10",
        name: "Ramakant Kumar",
        position: "Fabrication Lead",
        currentCompany: "TechLanz",
        currentRole: "Engineer Trainee",
        image: "/src/data/images/alumni/ramakant.jpeg",
        linkedin: "https://www.linkedin.com/in/rama-kant-kumar/",
      },
      {
        id: "11",
        name: "Faizan Khan",
        position: "ML lead",
        currentCompany: "NA",
        currentRole: "NA",
        image: "/src/data/images/alumni/faizan.jpg",
        linkedin: "https://www.linkedin.com/in/faizan-khan-ai/",
      },
      {
        id: "12",
        name: "Vanshika Goel",
        position: "UI/UX Lead",
        currentCompany: "Graphic Designer",
        currentRole: "JK Paper Ltd.",
        image: "/src/data/images/alumni/vanshika.png",
        linkedin: "https://www.linkedin.com/in/vanshika-goel-692328226/",
      },
    ],
  },
  {
    year: "2022-23",
    subtitle: "Core of 2022-23",
    description: "Meet the innovative team members who made their mark this year.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&crop=faces",
    achievements: ["IIT Kanpur Techkriti Winners", "Considition ML Hackathon Winners"],
    members: [
      {
        id: "13",
        name: "Vaibhav Khanna",
        position: "President",
        currentCompany: "Hardware Engineer",
        currentRole: "Zaptics Research",
        image: "/src/data/images/alumni/vaibhav.jpg",
        linkedin: "https://www.linkedin.com/in/vaibhav-khanna-198017195/",
      },
      {
        id: "14",
        name: "Ashish",
        position: "Vice President",
        currentCompany: "Ministry of Science and Technology",
        currentRole: "Project Associate",
        image: "/src/data/images/alumni/ashish.jpg",
        linkedin: "https://www.linkedin.com/in/ashishhhh/",
      },
    ],
  },  
  {
    year: "2021-22",
    subtitle: "Core of 2021-22",
    description: "Let's turn back the clock to 2021 and recognize the dedicated members whose passion powered our progress.",
    image: "/src/data/images/alumni/alumni.jpg",
    achievements: ["SIH Winners"],
    members: [
      {
        id: "15",
        name: "Jai garg",
        position: "President",
        currentCompany: "Massive Mobility",
        currentRole: "Product Manager",
        image: "/src/data/images/alumni/jai.jpg",
        linkedin: "https://www.linkedin.com/in/jai-garg/",
      },
      {
        id: "16",
        name: "Bhavya Sharma",
        position: "Vice President",
        currentCompany: "Pentair",
        currentRole: "Lead Electronics Engineer",
        image: "/src/data/images/alumni/bhavya.png",
        linkedin: "https://www.linkedin.com/in/bhavya-sharma-969662180/",
      },
      {
        id: "17",
        name: "Nitesh Garg",
        position: "Embedded Lead",
        currentCompany: "Google",
        currentRole: "Technical Soutions Engineer II",
        image: "/src/data/images/alumni/Nitesh.png",
        linkedin: "https://www.linkedin.com/in/nitesh-garg-/",
      },
      {
        id: "18",
        name: "Nikunj Aggarwal",
        position: "Android Lead",
        currentCompany: "Bharatpe",
        currentRole: "SDE-2",
        image: "/src/data/images/alumni/Nikunj.png",
        linkedin: "https://www.linkedin.com/in/nikunjagg/",
      },
      {
        id: "19",
        name: "Vansh Gupta",
        position: "",
        currentCompany: "Google",
        currentRole: "ML Software Engineer III",
        image: "/src/data/images/alumni/Vansh.jpeg",
        linkedin: "https://www.linkedin.com/in/imvansh25/",
      },
    ],       
  },
  {
    year: "2020-21",
    subtitle: "Core of 2020-21",
    description: "Their legacy is our inspiration. Meet the remarkable team from 2020 who left an indelible mark on Robogyan.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&crop=faces",
    achievements: ["SIH 2022 Winners", "Placed at Top Companies"],
    members: [
      {
        id: "20",
        name: "Hardik Gossain",
        position: "President",
        currentCompany: "Evertz",
        currentRole: "Test & Validation Specialist",
        image: "/src/data/images/alumni/hardik.png",
        linkedin: "https://www.linkedin.com/in/hardikgossain/",
      },
      {
        id: "21",
        name: "Aditya Agrawal",
        position: "Vice President",
        currentCompany: "Amazon",
        currentRole: "SDE2",
        image: "/src/data/images/alumni/aditya.png",
        linkedin: "https://www.linkedin.com/in/adityaagrawaldelhi/",
      },
      {
        id: "22",
        name: "Bhavya Sharma",
        position: "IOT, Drone and Research lead",
        currentCompany: "Pentair",
        currentRole: "Lead Electronics Engineer",
        image: "/src/data/images/alumni/bhavya.png",
        linkedin: "https://www.linkedin.com/in/bhavya-sharma-969662180/",
      },
      {
        id: "23",
        name: "Mohit Gupta",
        position: "Web Dev lead",
        currentCompany: "Mercedes-Benz",
        currentRole: "AI Engineer",
        image: "/src/data/images/alumni/mohit.jpg",
        linkedin: "#https://www.linkedin.com/in/mohit-gupta-114711178/",
      },
      {
        id: "24",
        name: "Jai garg",
        position: "Fabrication and Product Design lead",
        currentCompany: "Massive Mobility",
        currentRole: "Product Manager",
        image: "/src/data/images/alumni/jai.jpg",
        linkedin: "https://www.linkedin.com/in/jai-garg/",
      },
    ],       
  }
];
