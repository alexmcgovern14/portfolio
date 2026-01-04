import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook to handle copying text to clipboard with fallback support
 * @returns Object with copy function and copied state
 */
export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string, successMessage?: string) => {
    try {
      // Try modern Clipboard API first, fallback to legacy method
      try {
        await navigator.clipboard.writeText(text);
      } catch (clipboardErr) {
        // Fallback method for when Clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          textArea.remove();
        } catch (execErr) {
          textArea.remove();
          throw execErr;
        }
      }

      setCopied(true);
      toast.success(successMessage || 'Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(
        `Failed to copy: ${err instanceof Error ? err.message : 'Unknown error'}`
      );
    }
  };

  return { copyToClipboard, copied };
}




