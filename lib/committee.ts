export interface Member {
  img: string;   // 2-letter initials until photos arrive
  role: string;
  name: string;
  meta: string;
}

export interface BoardGroup {
  chair: Member;
  vice: Member[];
  directors: Member[];
}

export interface CommitteeGroup {
  chair: Member;
  vice: Member[];
  officers: Member[];
  executive: Member[];
}

export const BOARD: BoardGroup = {
  chair: {
    img: 'RD',
    role: 'President',
    name: 'Rajesh Deshmukh',
    meta: 'Founder · Sahyadri Broadlooms\nChair since 2022. Third-term director.',
  },
  vice: [
    { img: 'PK', role: 'Vice-President', name: 'Prakash Kshirsagar', meta: 'Kshirsagar Terry Mills\nHon. Treasurer 2018–22.' },
    { img: 'SM', role: 'Hon. Secretary', name: 'Shilpa Morarji', meta: 'Morarji Group\nFirst woman on the board (2020).' },
  ],
  directors: [
    { img: 'AN', role: 'Director · Finance', name: 'Anand Narayandas', meta: 'Godavari Textile Mills' },
    { img: 'VJ', role: 'Director · Exports', name: 'Vijay Jadhav', meta: 'Patil Terry Expo' },
    { img: 'HG', role: 'Director · Policy', name: 'Hemant Gadgil', meta: 'Neelkanth Textiles · Processing' },
    { img: 'SP', role: 'Director · Technical', name: 'Sudhir Patil', meta: 'Swastik Weaves · Jacquard' },
    { img: 'MV', role: 'Director · HR', name: 'Meenal Vaidya', meta: 'Shivanjali Textiles' },
    { img: 'RJ', role: 'Director · Youth', name: 'Rahul Joshi', meta: 'Bhimashankar Terry · 2G Entrepreneur' },
    { img: 'BK', role: 'Director · Heritage', name: 'Balwant Kulkarni', meta: 'Jamshree Ratansingji · est. 1909' },
  ],
};

export const COMMITTEE: CommitteeGroup = {
  chair: {
    img: 'NH',
    role: 'Convenor',
    name: 'Nitin Hegde',
    meta: 'Convenor since 2024. Runs monthly meetings and member services.',
  },
  vice: [
    { img: 'KP', role: 'Dy. Convenor · Events', name: 'Kiran Patankar', meta: 'Lead for VTTES 2026 organising' },
    { img: 'AR', role: 'Dy. Convenor · Advocacy', name: 'Anil Ranade', meta: 'Liaison with DIC & MSEDCL' },
  ],
  officers: [
    { img: 'SD', role: 'Officer · Training', name: 'Sonali Dhole', meta: 'Training Centre operations' },
    { img: 'VP', role: 'Officer · Lab', name: 'Vikram Phadke', meta: 'NABL accreditation lead' },
    { img: 'RC', role: 'Officer · Design', name: 'Radha Chavan', meta: 'Design Centre & CAD' },
    { img: 'MM', role: 'Officer · Membership', name: 'Manoj Mane', meta: 'New applications & renewals' },
  ],
  executive: [
    { img: 'AS', role: 'Exec · Finance', name: 'Asha Shinde', meta: 'Books & audit coordination' },
    { img: 'DJ', role: 'Exec · Secretariat', name: 'Dilip Jogdand', meta: 'Office manager · 14 years' },
    { img: 'PG', role: 'Exec · Communications', name: 'Pooja Gore', meta: 'Newsletter & social media' },
    { img: 'TK', role: 'Exec · Game Zone', name: 'Tushar Kamble', meta: 'Youth programmes & tournaments' },
    { img: 'LN', role: 'Exec · Rec. Zone', name: 'Lalita Nagarkar', meta: 'Reading room & library' },
    { img: 'IS', role: 'Exec · Logistics', name: 'Imran Shaikh', meta: 'Venues, travel, delegations' },
  ],
};
