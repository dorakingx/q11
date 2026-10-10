// jsdom does not implement window.scrollTo / scrollIntoView; the UI calls them on screen changes.
// Stub them so component tests do not print "Error: Not implemented" noise (behaviour is irrelevant in jsdom).
if (typeof window !== 'undefined') {
  window.scrollTo = (() => undefined) as typeof window.scrollTo;
  if (typeof Element !== 'undefined' && typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => undefined;
  }
}
