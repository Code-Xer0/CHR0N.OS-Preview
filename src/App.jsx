import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import { ThemeProvider } from './context/ThemeContext';

const githubPagesBase = window.location.pathname.startsWith('/CHRON.OS-Preview')
  ? '/CHRON.OS-Preview'
  : undefined;
const DevEditorPage = import.meta.env.DEV ? lazy(() => import('./editor/EditorPage')) : null;

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={githubPagesBase}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact.html" element={<ContactPage />} />
          <Route path="/privacy.html" element={<PrivacyPage />} />
          <Route path="/terms.html" element={<TermsPage />} />
          {DevEditorPage && (
            <Route
              path="/editor"
              element={(
                <Suspense fallback={null}>
                  <DevEditorPage />
                </Suspense>
              )}
            />
          )}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
