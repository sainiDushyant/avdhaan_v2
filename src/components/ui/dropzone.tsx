import * as React from 'react';
import { cn } from '@/lib/utils';
import DropzoneUpload from '../svg/DropzoneUpload';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Dropzone = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'file', onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Function to handle click event on "Choose file"
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    // Function to handle file drop
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault(); // Prevent default download behavior
      if (inputRef.current && e.dataTransfer.files.length > 0) {
        inputRef.current.files = e.dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event); // Trigger the file input's change event
      }
    };

    // Function to prevent default drag behavior
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    return (
      <div
        className="border-2 border-dashed border-blue-300 bg-blue-50 flex justify-center items-center p-6 rounded-lg h-[250px]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-center">
          <DropzoneUpload />

          <p className="text-[#464E5F] font-semibold">
            Drag and Drop file here or{' '}
            <span
              className="text-[#0A3690] cursor-pointer underline"
              onClick={handleClick}
            >
              Choose file
            </span>
          </p>
          <input
            type={type}
            className={cn('hidden', className)}
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === 'function') ref(el);
              else if (ref) ref.current = el;
            }}
            onChange={onChange}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Dropzone.displayName = 'Dropzone';

export { Dropzone };
