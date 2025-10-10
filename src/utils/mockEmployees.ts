export interface EmployeeRecord {
  userName: string;
  userId: string;
}

// Generates N dummy employees with readable names and IDs like E0001
export function getDummyEmployees(count: number = 1200): EmployeeRecord[] {
  const employees: EmployeeRecord[] = [];
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Avery",
    "Quinn",
    "Sawyer",
    "Reese",
    "Charlie",
    "Jamie",
    "Cameron",
    "Dakota",
    "Emerson",
    "Finley",
    "Harper",
    "Jules",
    "Kai",
    "Logan",
  ];
  const lastNames = [
    "Lee",
    "Patel",
    "Garcia",
    "Nguyen",
    "Kim",
    "Singh",
    "Martinez",
    "Rodriguez",
    "Brown",
    "Davis",
    "Wilson",
    "Clark",
    "Lopez",
    "Harris",
    "Lewis",
    "Walker",
    "Young",
    "King",
    "Wright",
    "Scott",
  ];

  for (let i = 1; i <= count; i++) {
    const id = `E${String(i).padStart(4, "0")}`;
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];
    const userName = `${first} ${last}`;
    employees.push({ userName, userId: id });
  }
  return employees;
}

export default getDummyEmployees;
