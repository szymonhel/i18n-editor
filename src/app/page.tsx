
import { Upload } from 'lucide-react';
import Image from 'next/image'
import FileUploader from "@/app/_components/FileUploader";

export default function Home() {
  return (
<div className={'flex flex-col gap-5 justify-center  align-middle'}>
    <FileUploader/>
</div>

  )
}
