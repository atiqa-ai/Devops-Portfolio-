import { AWS_CERTIFICATE_IMAGE, PYTHON_CERTIFICATE_IMAGE } from "./certificateImages";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  credential: string;
  completed: string;
  slug: "aws" | "python";
  accent: string;
  meta: string;
  /** The certificate document image shown in the viewer. */
  image: string;
  /** Suggested filename when the visitor downloads it. */
  fileName: string;
};

export const certificates: Certificate[] = [
  {
    id: "aws-cloud-practitioner",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    credential: "Completion Certificate",
    completed: "September 27, 2026",
    slug: "aws",
    accent: "#FF9900",
    meta: "Completed: September 27, 2026",
    image: AWS_CERTIFICATE_IMAGE,
    fileName: "Atiqa-Mushtaq-AWS-Cloud-Practitioner-Essentials.jpg",
  },
  {
    id: "python-beginners",
    title: "Python for Beginners",
    issuer: "Simplilearn SkillUp",
    credential: "Certificate of Completion",
    completed: "21st October 2025",
    slug: "python",
    accent: "#F2A33A",
    meta: "Certificate code : 9205022",
    image: PYTHON_CERTIFICATE_IMAGE,
    fileName: "Atiqa-Mushtaq-Python-for-Beginners-Simplilearn.jpg",
  },
];

export const getCertificate = (id?: string) =>
  certificates.find((c) => c.id === id) ?? certificates[0];
