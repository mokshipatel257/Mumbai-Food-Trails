import React, { useEffect, useState, useCallback } from 'react';

// Normalizes path to lowercase, ensures single leading slash, removes trailing slash (except root)
export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const clean = path.toLowerCase().trim().replace(/\/+$/, '');
  return clean.startsWith('/') ? clean : `/${clean}`;
}

export function navigate(to: string, replace = false) {
  const target = normalizePath(to);
  if (window.location.pathname === target && !replace) return;

  if (replace) {
    window.history.replaceState({}, '', target);
  } else {
    window.history.pushState({}, '', target);
  }

  // Dispatch synthetic popstate event to notify router listeners
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const goTo = useCallback((path: string, replace = false) => {
    navigate(path, replace);
  }, []);

  return { currentPath, navigate: goTo };
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: React.ReactNode;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  className,
  children,
  replace = false,
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    // Allow default browser handling for Ctrl/Cmd/Shift click or right click
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey
    ) {
      e.preventDefault();
      navigate(href, replace);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};

// SEO Metadata Updater for each unique URL
export function updatePageSeo(options: {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown>;
}) {
  const { title, description, canonicalPath, ogType = 'website', schema } = options;

  // Title
  document.title = title;

  // Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', description);

  // Canonical Link
  const fullUrl = `${window.location.origin}${normalizePath(canonicalPath)}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);

  // OpenGraph Tags
  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', fullUrl);
  setMetaProperty('og:type', ogType);

  // Twitter Cards
  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);

  // Schema.org JSON-LD
  let schemaScript = document.querySelector('script[data-page-schema="true"]');
  if (schema) {
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('data-page-schema', 'true');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);
  } else if (schemaScript) {
    schemaScript.remove();
  }
}
