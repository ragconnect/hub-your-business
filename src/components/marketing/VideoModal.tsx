import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  children: React.ReactNode;
}

const VideoModal = ({ children }: VideoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            src="https://www.loom.com/embed/b2351a9a592b483c9438d36b5e516e51?autoplay=1"
            frameBorder="0"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; fullscreen"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
