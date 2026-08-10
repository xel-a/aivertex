interface Skill {
  label: string;
  tags: string[];
}

export const skills = [
  {
    label: 'Security Foundations',
    tags: [
      'CIA Triad',
      'Defense in Depth',
      'Zero Trust',
      'Principle of Least Privilege',
      'MITRE ATT&CK',
      'NIST Cybersecurity Framework',
    ],
  },
  {
    label: 'Programming & Automation',
    tags: ['GoLang', 'TypeScript', 'Python', 'Bash', 'PowerShell'],
  },
  {
    label: 'Infrastructure & Networking',
    tags: ['Docker', 'Linux', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'SSH'],
  },
  {
    label: 'Tools & Technologies',
    tags: ['Git', 'Burp Suite', 'Nmap', 'Wireshark', 'VMware', 'Kali Linux'],
  },
] as Skill[];
