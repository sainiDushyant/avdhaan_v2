import CaretRight from '@/components/svg/CaretRight';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import useGetBasePath from '@/hooks/useGetBasePath';
import { navbarLinkData } from '@/lib/main';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

type NavBarItem = {
  to: string;
  title: string;
  children?: NavBarItem[];
};

const NavBar = () => {
  const basePath = useGetBasePath(0);
  if (basePath !== 'hes') return <div className="no-navbar"></div>;

  const getAccordianLink = useCallback((data: NavBarItem[], index: number) => {
    return (
      <Accordion
        type="single"
        collapsible
        className={cn(`w-[${180 - 5 * index}px]`, index > 0 && 'ml-2')}
      >
        {data.map((link, index) => {
          if (!link.children)
            return (
              <Link
                to={link.to}
                key={`accordian_item_${link.to}_${index}`}
                className="flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180"
              >
                <h3>{link.title}</h3>
                <CaretRight height="20px" width="20px" customFill="#020817" />
              </Link>
            );
          return (
            <AccordionItem
              value={`item-${index + 1}`}
              key={`accordian_item_${link.to}_${index}`}
              className="border-b-0"
            >
              <AccordionTrigger>
                <div>
                  <h3>{link.title}</h3>
                </div>
              </AccordionTrigger>

              {link.children && link.children.length > 0 && (
                <AccordionContent>
                  {getAccordianLink(link.children, index + 1)}
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }, []);

  return (
    <div className="custom-navbar fixed left-[100px] top-[75px] hidden lg:flex bg-white px-5 min-h-full">
      {getAccordianLink(navbarLinkData, 0)}
    </div>
  );
};

export default NavBar;
