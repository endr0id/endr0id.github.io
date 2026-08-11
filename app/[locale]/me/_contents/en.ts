import type { Profile } from "../_types/";

export const en: Profile = {
  name: "Wataru Endo",
  role: "Software Engineer",
  introduction: [
    "An engineer working across frontend and backend, with the occasional dive into infrastructure (Am I allowed to call myself a full-stack engineer?)",
    "I work on system design, development, testing (Unit/IT/E2E), CI/CD, refactoring, and paying down technical debt.",
    "Lately, I've been incorporating AI-driven development into my workflow and continuously updating my skills to keep up with the rapidly evolving AI landscape.",
  ].join("\n"),
  careerHistory: [
    {
      period: "May 2025 – Present",
      title:
        "Large-scale re-architecture and technical debt reduction for an HR-related service",
      achievements:
        "・Migrated from GraphQL to REST APIs using Kotlin/Spring Boot and upgraded core modules to newer versions\n・Redesigned the global store architecture in an Angular/RxJS environment and expanded unit test coverage to improve system quality",
    },
    {
      period: "Feb 2025 – Apr 2025",
      title:
        "Camera and image editing feature development for a Unity-to-Flutter mobile app migration",
      achievements:
        "・Selected packages for the framework migration to Flutter and implemented lifecycle management for native camera functionality\n・Implemented complex image editing interactions, including draggable/resizable study markers and stamps, as well as undo functionality",
    },
    {
      period: "Oct 2024 – Jan 2025",
      title:
        "Backend development of learning delivery and core logic for a speaking-focused language learning app",
      achievements:
        "・Developed speech evaluation logic, exercise retrieval, and learning progress management features using Java/Spring\n・Designed and implemented a backend recommendation notification management system to improve users' learning efficiency",
    },
    {
      period: "Mar 2022 – Sep 2024",
      title:
        "New development of internal operations and monitoring systems for a FinTech (PTS) startup",
      achievements:
        "・Led frontend requirements definition, technology selection, and the initial implementation of the frontend platform from the ground up\n・Built various administrative interfaces for transaction monitoring, customer data management, and internal operations automation",
    },
    {
      period: "Sep 2021 – Feb 2022",
      title:
        "Design refactoring and technical debt reduction for a SaaS platform for blue-collar workers",
      achievements:
        "・Introduced custom hooks and separated component responsibilities using React/TypeScript/React Native (FE)\n・Separated backend responsibilities and redesigned the codebase using Go (Echo) (BE)",
    },
    {
      period: "May 2021 – Aug 2021",
      title:
        "Development of a large-scale log collection platform using Kubernetes for a telecommunications carrier",
      achievements:
        "・Codified AWS infrastructure using Terraform/Ansible (IaC) and automated configuration management\n・Operated Kubernetes environments using Istio/Argo CD and built a log collection and forwarding platform with Fluentd",
    },
    {
      period: "Feb 2020 – Apr 2021",
      title:
        "Development of a large-scale survey distribution platform for marketing research (MRX)",
      achievements:
        "・Implemented high-volume email delivery using AWS (SQS/SES)\n・Handled infrastructure changes (EC2/cron configuration, etc.) and backend configuration changes associated with batch server consolidation",
    },
    {
      period: "May 2018 – Jan 2020",
      title:
        "Backend development and maintenance of an amusement service integrated with gaming machines",
      achievements:
        "・Developed backend features for handling gameplay data from gaming machines, such as winnings and play time, as well as content unlock functionality\n・Performed weekly data aggregation and extraction using SQL, along with ongoing system maintenance and operations",
    },
    {
      period: "Aug 2017 – Apr 2018",
      title:
        "Development and operation of a private cloud infrastructure using OpenStack for a large-scale video streaming service",
      achievements:
        "・Responsible for building an OpenStack environment that met security requirements\n・Troubleshot backend issues and fixed bugs based on support requests",
    },
  ],
} as const;
