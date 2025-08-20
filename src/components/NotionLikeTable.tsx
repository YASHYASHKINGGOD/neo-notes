import React, { useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';

interface NotionLikeTableProps {
  editor: any;
}

const NotionLikeTable: React.FC<NotionLikeTableProps> = ({ editor }) => {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor || !tableRef.current) return;

    const handleTableClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if clicked on add column button
      if (target.classList.contains('add-column-btn') || target.closest('.add-column-btn')) {
        event.preventDefault();
        event.stopPropagation();
        try {
          editor.chain().focus().addColumnAfter().run();
        } catch (error) {
          console.log('Column add failed, trying alternative method');
          editor.commands.addColumnAfter();
        }
      }
      
      // Check if clicked on add row button  
      if (target.classList.contains('add-row-btn') || target.closest('.add-row-btn')) {
        event.preventDefault();
        event.stopPropagation();
        try {
          editor.chain().focus().addRowAfter().run();
        } catch (error) {
          console.log('Row add failed, trying alternative method');
          editor.commands.addRowAfter();
        }
      }
    };

    const addTableControls = () => {
      const tables = document.querySelectorAll('.ProseMirror table');
      
      tables.forEach((table) => {
        // Remove existing controls
        const existingControls = table.querySelectorAll('.table-control');
        existingControls.forEach(control => control.remove());
        
        // Add column controls
        const addColumnBtn = document.createElement('button');
        addColumnBtn.className = 'table-control add-column-btn';
        addColumnBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        addColumnBtn.title = 'Add Column';
        
        // Position it to the right of the table
        addColumnBtn.style.cssText = `
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--bg-secondary);
          border: 2px solid var(--border-main);
          color: var(--text-main);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow);
          font-family: 'Space Grotesk', sans-serif;
          opacity: 0;
          transition: all 0.2s ease;
          z-index: 10;
        `;
        
        // Add row controls for each row
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
          const addRowBtn = document.createElement('button');
          addRowBtn.className = 'table-control add-row-btn';
          addRowBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
          addRowBtn.title = 'Add Row';
          
          addRowBtn.style.cssText = `
            position: absolute;
            left: -40px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--bg-secondary);
            border: 2px solid var(--border-main);
            color: var(--text-main);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--shadow);
            font-family: 'Space Grotesk', sans-serif;
            opacity: 0;
            transition: all 0.2s ease;
            z-index: 10;
          `;
          
          row.style.position = 'relative';
          row.appendChild(addRowBtn);
        });
        
        (table as HTMLElement).style.position = 'relative';
        table.appendChild(addColumnBtn);
        
        // Show controls on hover
        table.addEventListener('mouseenter', () => {
          const controls = table.querySelectorAll('.table-control');
          controls.forEach((control: any) => {
            control.style.opacity = '0.8';
          });
        });
        
        table.addEventListener('mouseleave', () => {
          const controls = table.querySelectorAll('.table-control');
          controls.forEach((control: any) => {
            control.style.opacity = '0';
          });
        });
        
        // Hover effects and click handlers for individual controls
        const controls = table.querySelectorAll('.table-control');
        controls.forEach((control: any) => {
          control.addEventListener('mouseenter', () => {
            control.style.opacity = '1';
            control.style.background = 'var(--accent)';
            control.style.color = 'var(--bg-main)';
            control.style.transform = control.classList.contains('add-column-btn') 
              ? 'translateY(-50%) scale(1.1)' 
              : 'translateY(-50%) scale(1.1)';
          });
          
          control.addEventListener('mouseleave', () => {
            control.style.opacity = '0.8';
            control.style.background = 'var(--bg-secondary)';
            control.style.color = 'var(--text-main)';
            control.style.transform = 'translateY(-50%) scale(1)';
          });
          
          // Add click handlers directly to each control
          control.addEventListener('click', (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (control.classList.contains('add-column-btn')) {
              try {
                editor.chain().focus().addColumnAfter().run();
              } catch (error) {
                console.log('Column add failed:', error);
              }
            } else if (control.classList.contains('add-row-btn')) {
              try {
                editor.chain().focus().addRowAfter().run();
              } catch (error) {
                console.log('Row add failed:', error);
              }
            }
          });
        });
      });
    };

    // Add controls when editor content changes
    const handleUpdate = () => {
      setTimeout(addTableControls, 100);
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', addTableControls);
    
    // Initial setup
    setTimeout(addTableControls, 100);

    document.addEventListener('click', handleTableClick);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', addTableControls);
      document.removeEventListener('click', handleTableClick);
    };
  }, [editor]);

  return <div ref={tableRef} style={{ display: 'none' }} />;
};

export default NotionLikeTable;