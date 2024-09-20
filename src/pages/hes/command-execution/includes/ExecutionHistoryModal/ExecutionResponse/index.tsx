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
      
      {open &&
        <div className="absolute w-[100%] h-[40vh] z-20 bg-[red] left-0 top-[80px]">

        </div>
      }
    </>
  )
}

export default ExecutionResponse