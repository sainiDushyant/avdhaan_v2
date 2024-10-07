import CaretRight from '@/components/svg/CaretRight';
import { useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const basePath = useGetBasePath(0);

  // Checks if the link or any of its children is active
  const isActive = (linkTo: string) =>
    pathname === linkTo || pathname === `${linkTo}\\`;

  const isParentActive = (linkTo: string, children?: NavBarItem[]) => {
    // Check if the current location matches any child or the parent itself
    if (pathname.startsWith(linkTo)) return true;
    if (children && children.some((child) => isActive(child.to))) return true;
    return false;
  };

  const getAccordionLink = useCallback(
    (data: NavBarItem[], index: number) => {
      return (
        <Accordion
          type="single"
          collapsible
          className={cn(`w-[${180 - 5 * index}px]`, index > 0 && 'ml-2')}
        >
          {data.map((link, index) => {
            if (!link.children) {
              return (
                <Link
                  to={link.to}
                  key={`accordion_item_${link.to}_${index}`}
                  className={`flex flex-1 items-center justify-between py-4 decoration-none font-medium transition-all [&[data-state=open]>svg]:rotate-180  p-5 ${
                    isActive(link.to) ? 'bg bg-[#D6EEEBF5]' : ''
                  }`}
                >
                  <h3
                    className={
                      isActive(link.to) ? 'text-[#0A3690]' : 'text-[#708CC7]'
                    }
                  >
                    {link.title}
                  </h3>
                  <CaretRight height="20px" width="20px" customFill="#708CC7" />
                </Link>
              );
            }

            return (
              <AccordionItem
                value={`item-${index + 1}`}
                key={`accordion_item_${link.to}_${index}`}
                className={`border-b-0 p-5 ${
                  isParentActive(link.to, link.children)
                    ? 'bg bg-[#D6EEEBF5]'
                    : ''
                } `}
              >
                <AccordionTrigger className="text-[#708CC7] py-0 underline-none">
                  <div>
                    <h3
                      className={`text-left text-base  ${
                        isParentActive(link.to, link.children)
                          ? 'text-[#0A3690]'
                          : 'text-[#708CC7]'
                      } no-underline `}
                    >
                      {link.title}
                    </h3>
                  </div>
                </AccordionTrigger>

                {link.children && link.children.length > 0 && (
                  <AccordionContent>
                    <ul className="list-disc pl-6">
                      {link.children.map((child, childIndex) => (
                        <li
                          key={`child_${child.to}_${childIndex}`}
                          className={`m-3 ${
                            isActive(child.to)
                              ? 'text-[#004FFF]'
                              : 'text-[#708CC7]'
                          }`}
                        >
                          <Link
                            to={child.to}
                            className="py-1 text-sm font-medium no-underline"
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      );
    },
    [pathname]
  );

  if (basePath !== 'hes') return <div className="no-navbar"></div>;

  return (
    <div className="custom-navbar fixed left-[100px] top-[75px] hidden lg:flex bg-white min-h-full ">
      {getAccordionLink(navbarLinkData, 0)}
    </div>
  );
};

export default NavBar;
