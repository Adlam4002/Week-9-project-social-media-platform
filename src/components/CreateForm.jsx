import * as Dialog from "@radix-ui/react-dialog";
import "@/app/globals.css";

export default function CreateForm() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Create profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <h1>testing</h1>
          <Dialog.Title />
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
