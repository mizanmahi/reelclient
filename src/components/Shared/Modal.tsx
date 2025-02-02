import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';

interface AZModalProps {
   isOpen: boolean;
   onClose: () => void;
   children: React.ReactNode;
   title?: string;
}

const Modal: React.FC<AZModalProps> = ({
   isOpen,
   onClose,
   children,
   title,
}) => {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className='px-2 md:px-4  overflow-y-scroll md:overflow-hidden max-h-screen '>
            {title && (
               <DialogHeader>
                  <DialogTitle className='text-black'>{title}</DialogTitle>
               </DialogHeader>
            )}
            {children}
         </DialogContent>
      </Dialog>
   );
};

export default Modal;
