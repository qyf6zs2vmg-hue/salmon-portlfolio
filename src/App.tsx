/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorks } from './components/SelectedWorks';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { IntroCurtain } from './components/IntroCurtain';
import { FEATURED_PROJECTS, ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [introReady, setIntroReady] = useState(false);

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % FEATURED_PROJECTS.length
        : (currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length;
    setSelectedProject(FEATURED_PROJECTS[nextIndex]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F3F0E8] text-[#101014]">
        <IntroCurtain onComplete={() => setIntroReady(true)} />

        <Navbar />

        <main className="flex-1">
          <HeroSection
            projects={FEATURED_PROJECTS}
            introReady={introReady}
            onSelectProject={setSelectedProject}
          />
          <SelectedWorks
            projects={FEATURED_PROJECTS}
            onSelectProject={setSelectedProject}
          />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={() => handleNavigateProject('prev')}
          onNext={() => handleNavigateProject('next')}
        />
      </div>
    </MotionConfig>
  );
}
