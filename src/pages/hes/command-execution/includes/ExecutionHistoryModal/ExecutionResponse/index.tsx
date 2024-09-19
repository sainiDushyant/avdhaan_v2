import EyeClose from '@/components/svg/EyeClose'
import Button from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { useState } from 'react'

const ExecutionResponse = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost">
        {!open ? <Eye /> : <EyeClose />}
      </Button>

        <div className="absolute min-w-full left-0 top-[100px] bg-[red] h-[40vh]">

        </div>
    </>
  )
}

export default ExecutionResponse