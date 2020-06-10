import { Injectable } from '@angular/core';

@Injectable()
export class CommandExecutorService {

  execute(command: string): void {

    if (command === 'enableObjectResizing') {
      document.execCommand('enableObjectResizing', true, true);
      return;
    }

    if (command === 'blockquote') {
      document.execCommand('formatBlock', false, '<blockquote>');
      return;
    }

    if (command === 'removeBlockquote') {
      document.execCommand('formatBlock', false, 'div');
      return;
    }

    if (command === 'link') {
      this.createLink();
      return;
    }

    if (command === 'image') {
      this.insertImage();
      return;
    }

    if (command.includes('foreColor')) {
      const color = command.split(':')[1];
      document.execCommand('foreColor', false, color);
      return;
    }

    document.execCommand(command, false, null);
  }

  private insertImage(): void {
    const imageURI = prompt('Enter Image URL', 'http://');
    if (imageURI) {
      const inserted = document.execCommand('insertImage', false, imageURI);
      if (!inserted) {
        throw new Error('Invalid URL');
      }
    }
    return;
  }

  private createLink(): void {
    const selection = document.getSelection();

    if (selection.anchorNode.parentElement.tagName === 'A') {
      const linkURL = prompt('Enter URL', selection.anchorNode.parentElement.getAttribute('href'));
      if (linkURL) {
        document.execCommand('createLink', false, linkURL);
      }
    } else {
      if (selection['type'] === 'None') {
        throw new Error('No selection made');
      } else {
        const linkURL = prompt('Enter URL', 'http://');
        if (linkURL) {
          document.execCommand('createLink', false, linkURL);
        }
      }
    }
    return;
  }

}
