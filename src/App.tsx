/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatBand } from './components/StatBand';
import { SelectedWork, ProjectItem } from './components/SelectedWork';
import { InterfaceConcepts } from './components/InterfaceConcepts';
import { ServicesAccordion } from './components/ServicesAccordion';
import { WebsitePackages } from './components/WebsitePackages';
import { ProcessStrip } from './components/ProcessStrip';
import { ClosingCtaFooter } from './components/ClosingCtaFooter';
import { ProjectModal } from './components/ProjectModal';
import { ProjectViewerModal } from './components/ProjectViewerModal';
import { PackageTier } from './utils/pricing';

export default function App() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [preselectedPackageId, setPreselectedPackageId] = useState<string | undefined>('start');
  const [selectedViewerProject, setSelectedViewerProject] = useState<ProjectItem | null>(null);

  const handleOpenProjectModal = (packageId?: string) => {
    setPreselectedPackageId(packageId || 'start');
    setIsProjectModalOpen(true);
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setPreselectedPackageId(pkg.id);
    setIsProjectModalOpen(true);
  };

  const handleOpenProjectViewer = (project: ProjectItem) => {
    setSelectedViewerProject(project);
  };

  return (
    <div className="min-h-screen bg-[#050625] text-[#F9F6FF] selection:bg-[#297EE9] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Sticky Navigation */}
      <Navbar onOpenProjectModal={handleOpenProjectModal} />

      <main>
        {/* 2. Full-viewport Hero */}
        <Hero onOpenProjectModal={handleOpenProjectModal} />

        {/* 3. Four-item Proof/Stat Band */}
        <StatBand />

        {/* 4. Selected Work */}
        <SelectedWork onOpenProjectViewer={handleOpenProjectViewer} />

        {/* 5. Interface Concepts */}
        <InterfaceConcepts onOpenProjectModal={handleOpenProjectModal} />

        {/* 6. Services */}
        <ServicesAccordion onOpenProjectModal={handleOpenProjectModal} />

        {/* 7. Website Packages */}
        <WebsitePackages onSelectPackage={handleSelectPackage} />

        {/* 8. Process / How it works */}
        <ProcessStrip />
      </main>

      {/* 9. Closing CTA and Footer */}
      <ClosingCtaFooter onOpenProjectModal={handleOpenProjectModal} />

      {/* Interactive Project Inquiry Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        preselectedPackageId={preselectedPackageId}
      />

      {/* Interactive Project Viewer Modal */}
      <ProjectViewerModal
        project={selectedViewerProject}
        onClose={() => setSelectedViewerProject(null)}
        onStartSimilarProject={(pkgId) => handleOpenProjectModal(pkgId)}
      />
    </div>
  );
}
