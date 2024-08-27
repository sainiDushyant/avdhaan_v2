import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function enableMocking() {
  const { worker } = await import('../mocks/browser');
  return worker.start()
}

export function serializeFormData<T>(formData: FormData){
  const formPayload: { [key: string]: string | string[]; } = {};
  for (const [key, value] of formData.entries()) {
      const keyExists = key in formPayload;
      if(!keyExists){
          formPayload[key] = value as string;
      }else{
          const prevValue = formPayload[key];
          if(typeof prevValue === "object"){
            const prevValue = formPayload[key];
            formPayload[key] = [ ...prevValue, value as string ];
          }else{
            formPayload[key] = [ prevValue, value as string ];
          }
      }
  }
  return formPayload as T;
}

export function convertToDateTime(input: string, postFix: string){
    if(!input || !input.length) return ""
  const dateTime = input.split("T");
  if(dateTime.length < 2) return ""
  let time = dateTime[1];
  if(time.length === 5){
    time = time + postFix
  }
  return dateTime[0] + " " + time;
}

export function isValidDate(dateString: string): boolean{
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}


export const onMouseSidebarEnter = (val: number) => {
  const items = document.querySelectorAll(`.sidebar-item-${val}`);
  Array.from(items).forEach((item)  => {
      const sidebarIcon = item.querySelector(".sidebar-icon") as HTMLElement;
      if(sidebarIcon){
        sidebarIcon.classList.remove("custom-sidebar-icon");
      }
      const newItem = item as HTMLElement;
      (newItem.style.backgroundColor) = '#48b1f1' 
      
  })
}

export const onMouseSidebarLeave = (val: number) => {
  const items = document.querySelectorAll(`.sidebar-item-${val}`);
  Array.from(items).forEach(item => {
    const sidebarIcon = item.querySelector(".sidebar-icon") as HTMLElement;
    if(sidebarIcon){
      sidebarIcon.classList.add("custom-sidebar-icon");
    }
    const newItem = item as HTMLElement;
    newItem.style.backgroundColor = 'transparent'
  })
}