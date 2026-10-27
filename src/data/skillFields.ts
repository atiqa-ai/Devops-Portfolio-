/* ============================================================
   Skills & capabilities — the five fields and their tooling.
   Names follow the approved skills list; no extra technologies.
   ============================================================ */

import type { Skill } from "./resume";

export type FieldSkill = Skill;

export type SkillField = {
  id: string;
  index: string;
  title: string;
  short: string;
  blurb: string;
  skills: FieldSkill[];
};

const f = {
  aws: { name: "AWS", slug: "aws", color: "#FF9900" },
  azure: { name: "Azure", slug: "azure", color: "#38B6FF" },
  vpc: { name: "VPC", slug: "aws", color: "#FF9900" },
  iam: { name: "IAM", slug: "aws", color: "#FF9900" },
  linux: { name: "Linux", slug: "linux", color: "#FCC624" },
  terraform: { name: "Terraform", slug: "terraform", color: "#7B42BC" },
  cloudformation: { name: "CloudFormation", slug: "aws", color: "#FF9900" },

  docker: { name: "Docker", slug: "docker", color: "#2496ED" },
  kubernetes: { name: "Kubernetes", slug: "kubernetes", color: "#326CE5" },
  helm: { name: "Helm", slug: "helm", color: "#0F1689" },
  actions: { name: "GitHub Actions", slug: "githubactions", color: "#E8E8E8" },
  gitlab: { name: "GitLab CI", slug: "gitlab", color: "#FC6D26" },
  jenkins: { name: "Jenkins", slug: "jenkins", color: "#D33833" },
  gitops: { name: "GitOps", slug: "git", color: "#F05032" },
  nomad: { name: "Nomad", slug: "nomad", color: "#00CA8E" },

  prometheus: { name: "Prometheus", slug: "prometheus", color: "#E6522C" },
  grafana: { name: "Grafana", slug: "grafana", color: "#F46800" },
  loki: { name: "Loki" },
  promtail: { name: "Promtail", slug: "promtail", color: "#F46800" },
  alertmanager: { name: "Alertmanager", slug: "prometheus", color: "#E6522C" },
  nginx: { name: "Nginx", slug: "nginx", color: "#009639" },
  lb: { name: "Load Balancers" },
  secrets: { name: "Secrets Management" },
  scout: { name: "Docker Scout (vulnerability scanning)", slug: "docker", color: "#2496ED" },

  python: { name: "Python", slug: "python", color: "#3776AB" },
  bash: { name: "Bash", slug: "gnubash", color: "#4EAA25" },
  go: { name: "Go", slug: "go", color: "#00ADD8" },
  node: { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
  powershell: { name: "PowerShell", slug: "powershell", color: "#5391FE" },
} satisfies Record<string, FieldSkill>;

export const skillFields: SkillField[] = [
  {
    id: "cloud",
    index: "01",
    title: "Cloud Foundation",
    short: "Cloud",
    blurb: "Cloud infrastructure, identity foundations and repeatable provisioning.",
    skills: [f.aws, f.azure, f.linux, f.terraform, f.cloudformation],
  },
  {
    id: "delivery",
    index: "02",
    title: "Delivery Automation",
    short: "Delivery",
    blurb: "Container platforms, orchestration and repeatable release pipelines.",
    skills: [f.docker, f.kubernetes, f.helm, f.actions, f.gitlab, f.jenkins, f.gitops, f.nomad],
  },
  {
    id: "reliability",
    index: "03",
    title: "Reliability & Observability",
    short: "Reliability",
    blurb: "Metrics, logs and dashboards that keep production behaviour visible.",
    skills: [f.prometheus, f.grafana, f.loki, f.promtail, f.alertmanager],
  },
  {
    id: "networking",
    index: "04",
    title: "Networking & Security",
    short: "Networking",
    blurb: "Network segmentation, edge routing, identity boundaries and vulnerability scanning.",
    skills: [f.vpc, f.iam, f.nginx, f.lb, f.secrets, f.scout],
  },
  {
    id: "engineering",
    index: "05",
    title: "Engineering Automation",
    short: "Automation",
    blurb: "Languages and configuration tooling used to automate the work.",
    skills: [f.python, f.bash, f.go, f.node, f.powershell],
  },
];

export const fieldSkillCount = skillFields.reduce((total, field) => total + field.skills.length, 0);
