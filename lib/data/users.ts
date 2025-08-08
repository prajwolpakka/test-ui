export type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
  createdAt: string;
  department: string;
  phone: string;
  bio: string;
  lastLogin: string;
};

let users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2023-01-15",
    department: "Engineering",
    phone: "+1 234 567 8900",
    bio: "Senior Software Engineer with 8+ years of experience",
    lastLogin: "2023-12-01T10:30:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-02-20",
    department: "Marketing",
    phone: "+1 234 567 8901",
    bio: "Marketing Specialist focused on digital campaigns",
    lastLogin: "2023-12-01T09:15:00Z",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-03-10",
    department: "Sales",
    phone: "+1 234 567 8902",
    bio: "Sales Representative with strong client relationships",
    lastLogin: "2023-11-30T14:20:00Z",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-04-05",
    department: "Product",
    phone: "+1 234 567 8903",
    bio: "Product Manager passionate about user-centric design",
    lastLogin: "2023-12-02T08:45:00Z",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2023-05-12",
    department: "IT",
    phone: "+1 234 567 8904",
    bio: "IT Administrator maintaining infrastructure and security",
    lastLogin: "2023-12-02T11:05:00Z",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-06-18",
    department: "HR",
    phone: "+1 234 567 8905",
    bio: "HR Specialist focused on talent acquisition",
    lastLogin: "2023-11-25T16:30:00Z",
  },
  {
    id: 7,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-07-22",
    department: "Operations",
    phone: "+1 234 567 8906",
    bio: "Operations expert with a focus on efficiency",
    lastLogin: "2023-12-02T12:40:00Z",
  },
  {
    id: 8,
    name: "Fiona Gallagher",
    email: "fiona@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-08-30",
    department: "Finance",
    phone: "+1 234 567 8907",
    bio: "Finance Analyst with strong modeling skills",
    lastLogin: "2023-12-01T18:20:00Z",
  },
  {
    id: 9,
    name: "George Miller",
    email: "george@example.com",
    role: "User",
    status: "Inactive",
    createdAt: "2023-09-11",
    department: "Support",
    phone: "+1 234 567 8908",
    bio: "Customer Support Specialist and knowledge base curator",
    lastLogin: "2023-11-27T10:10:00Z",
  },
  {
    id: 10,
    name: "Hannah Lee",
    email: "hannah@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-10-03",
    department: "Design",
    phone: "+1 234 567 8909",
    bio: "UI/UX Designer crafting delightful interfaces",
    lastLogin: "2023-12-02T07:55:00Z",
  },
  {
    id: 11,
    name: "Ian Wright",
    email: "ian@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-10-21",
    department: "Engineering",
    phone: "+1 234 567 8910",
    bio: "Full-stack developer exploring modern tooling",
    lastLogin: "2023-12-02T13:15:00Z",
  },
  {
    id: 12,
    name: "Julia Roberts",
    email: "julia@example.com",
    role: "User",
    status: "Active",
    createdAt: "2023-11-10",
    department: "Marketing",
    phone: "+1 234 567 8911",
    bio: "Content Strategist driving brand narratives",
    lastLogin: "2023-12-02T09:35:00Z",
  },
];

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function addUser(data: Omit<User, "id" | "createdAt" | "lastLogin">): User {
  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser: User = {
    id: newId,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    createdAt: new Date().toISOString().split("T")[0],
    department: data.department || "General",
    phone: data.phone || "",
    bio: data.bio || "",
    lastLogin: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

export function updateUser(id: number, data: Partial<User>): User | null {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const updated: User = {
    ...users[index],
    ...data,
    id,
    createdAt: users[index].createdAt,
    lastLogin: data.lastLogin || users[index].lastLogin,
  };
  users[index] = updated;
  return updated;
}

export function deleteUser(id: number): boolean {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}


