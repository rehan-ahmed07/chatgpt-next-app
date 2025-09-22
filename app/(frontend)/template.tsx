// Template: re-mounts subtree on navigation to ensure scroll and local state reset
// Useful for storefront where filters or transient state shouldn't carry between pages

export default function FrontendTemplate({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}