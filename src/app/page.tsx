
import { Upload } from 'lucide-react';
import Image from 'next/image'
import FileUploader from "@/app/components/FileUploader";

export default function Home() {
  return (
      <main className={'flex h-screen w-screen justify-center items-center align-middle'}>
        <FileUploader/>

      </main>
  )
}
