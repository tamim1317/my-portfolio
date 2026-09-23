import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/layout/container";
import { getAllProjects, getAllTechnologies } from "@/lib/projects";
import { ProjectsClient } from "./_components/projects-client";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full stack and frontend projects by Md Tamim Hossain — real applications built with React, Next.js, Node.js, and TypeScript.",
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const technologies = getAllTechnologies();

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero
          eyebrow="My Work"
          title="Projects"
          description="Real applications built to solve real problems. Each case study covers the problem, technical decisions, and lessons learned."
        />

        <div className="section-padding-sm">
          <Container>
            <ProjectsClient projects={projects} allTechnologies={technologies} />
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
