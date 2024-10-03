import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ApexOptions } from 'apexcharts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function enableMocking() {
  const { worker } = await import('../mocks/browser');
  return worker.start();
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export const onMouseSidebarEnter = (val: number) => {
  const items = document.querySelectorAll(`.sidebar-item-${val}`);
  Array.from(items).forEach((item) => {
    const sidebarIcon = item.querySelector('.sidebar-icon') as HTMLElement;
    if (sidebarIcon) {
      sidebarIcon.classList.remove('custom-sidebar-icon');
    }
    const newItem = item as HTMLElement;
    newItem.style.backgroundColor = '#48b1f1';
  });
};

export const onMouseSidebarLeave = (val: number) => {
  const items = document.querySelectorAll(`.sidebar-item-${val}`);
  Array.from(items).forEach((item) => {
    const sidebarIcon = item.querySelector('.sidebar-icon') as HTMLElement;
    if (sidebarIcon) {
      sidebarIcon.classList.add('custom-sidebar-icon');
    }
    const newItem = item as HTMLElement;
    newItem.style.backgroundColor = 'transparent';
  });
};

function createUniqueColorGenerator() {
  let counter = 0; // Initialize counter

  function getRandomChannelValue(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getUniqueColor() {
    let red, green, blue;

    // Ensure colors are not too dark or too light
    do {
      // Generate random values for the RGB channels
      red = getRandomChannelValue(50, 205); // Avoid too dark (min=50) and too light (max=205)
      green = getRandomChannelValue(50, 205);
      blue = getRandomChannelValue(50, 205);

      // Adjust based on counter to ensure uniqueness
      red = (red + counter * 1234567) & 0xff;
      green = (green + counter * 2345678) & 0xff;
      blue = (blue + counter * 3456789) & 0xff;

      // Increment counter
      counter++;

      // Ensure the color is not too dark or too light
    } while (red + green + blue < 150 || red + green + blue > 600);

    // Convert RGB to hex color
    const color = `#${red.toString(16).padStart(2, '0')}${green
      .toString(16)
      .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    return color;
  }

  return getUniqueColor;
}

export const getUniqueColor = createUniqueColorGenerator();

function getRandomCoordinate(max: number) {
  return Math.floor(Math.random() * max);
}

export function generateRandomShape() {
  return `M ${getRandomCoordinate(50)} ${getRandomCoordinate(
    50
  )} C ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )} S ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )} C ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )} S ${getRandomCoordinate(200)} ${getRandomCoordinate(
    100
  )}, ${getRandomCoordinate(200)} ${getRandomCoordinate(100)} Z`;
}

export const formatDate = (
  date: string | Date | number,
  format: string
): string => {
  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case 'MMM YYYY':
      options.year = 'numeric';
      options.month = 'short';
      break;
    case 'D MMM':
      options.day = 'numeric';
      options.month = 'short';
      break;
    case 'h:mm A':
      options.hour = 'numeric';
      options.minute = 'numeric';
      options.hour12 = true;
      break;
    case 'DD-MM-YYYY':
      options.day = '2-digit';
      options.month = '2-digit';
      options.year = 'numeric';
      break;
    case 'MM-DD-YYYY':
      options.month = '2-digit';
      options.day = '2-digit';
      options.year = 'numeric';
      break;
    case 'HH:mm':
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

export function formatDateInLocalStr(dateStr: string) {
  if (!dateStr) {
    return;
  }
  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return date.toLocaleDateString('en-US', options);
}

export function getDateRangesFor7Days(): {
  todayStart: string;
  sevenDaysAgoStart: string;
} {
  const now = new Date();

  // Helper function to format date in "YYYY-MM-DD HH:mm:ss"
  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Today at 00:00:00
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );

  // 7 days before today at 00:00:00
  const sevenDaysAgoStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
    0,
    0,
    0
  );

  return {
    todayStart: formatDate(todayStart),
    sevenDaysAgoStart: formatDate(sevenDaysAgoStart)
  };
}

export type DataType = {
  title?: string;
  value: number;
  percentage?: number;
  color?: string;
  totalCount?: number;
  data_timestamp: string | Date | number;
};

export type ChartData = {
  [key: string]: DataType[];
};

export const prepareChartData = (
  data: ChartData,
  chartType: 'bar' | 'line',
  dateType: 'days' | 'time' | 'month'
) => {
  const location = window && window?.location?.href?.split('/');
  const fileName =
    (location && `${location[location.length - 1]} data`) || 'data';
  const transformDataForChart = (data: DataType[]) => {
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(a.data_timestamp).getTime() -
        new Date(b.data_timestamp).getTime()
    );

    const dateFormat =
      dateType === 'month'
        ? 'MMM YYYY'
        : dateType === 'days'
        ? 'D MMM'
        : 'h:mm A';

    return {
      dates: sortedData.map((item) =>
        formatDate(item.data_timestamp, dateFormat)
      ),
      values: sortedData.map((item) => item.value)
    };
  };

  const collectedDataTransformed = transformDataForChart(data['data1'] || []);
  const missedDataTransformed = transformDataForChart(data['data2'] || []);

  const getLimitedData = (
    data: { dates: string[]; values: number[] },
    limit: number
  ) => {
    const slicedDates = data.dates.slice(0, limit);
    const slicedValues = data.values.slice(0, limit);
    return { dates: slicedDates, values: slicedValues };
  };

  const isMobile = window.innerWidth < 768;
  const limit = isMobile ? 4 : collectedDataTransformed.dates.length; // Limit to 4 on mobile or show all

  const collectedDataLimited = getLimitedData(collectedDataTransformed, limit);
  const missedDataLimited = getLimitedData(missedDataTransformed, limit);

  const series = [
    {
      name: '% Reads Fetched',
      data: collectedDataLimited.values
    },
    {
      name: '% Missed Fetched',
      data: missedDataLimited.values
    }
  ];

  const commonOptions: ApexOptions = {
    chart: {
      zoom: { enabled: false },
      type: chartType,
      height: 350,
      toolbar: {
        offsetY: -45,
        tools: {
          download:
            '<img src="/assets/images/other/graphDownload.svg " class="graph-download-icon"> </img>'
        },
        show: true,
        export: {
          csv: {
            filename: fileName
          },
          svg: {
            filename: fileName
          },
          png: {
            filename: fileName
          }
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: false
      },
      labels: {
        formatter: (val) => `${val}%`,
        style: {
          fontSize: '12px',
          colors: ['#A3B2CF']
        }
      }
    },

    xaxis: {
      tooltip: {
        enabled: false
      },
      categories: collectedDataLimited.dates,
      labels: {
        style: {
          fontSize: '12px',
          colors: collectedDataLimited.dates.map(() => '#A3B2CF')
        },
        format:
          dateType === 'month'
            ? 'MMM yyyy'
            : dateType === 'days'
            ? 'd MMM'
            : 'h:mm TT'
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 20,
        vertical: 5
      }
    },
    tooltip: {
      followCursor: true,
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return (
          '<div class="arrow_box">' +
          '<span>' +
          `${series[seriesIndex][dataPointIndex]}%` +
          '</span>' +
          '</div>'
        );
      }
    },
    noData: {
      text: 'No data available for this time frame.',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#0A3690',
        fontSize: '20px',
        fontFamily: 'sans-serif'
      }
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250
          },
          xaxis: {
            categories: collectedDataLimited.dates, // Show only the last 4 entries
            labels: {
              style: {
                fontSize: '8px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '8px'
              }
            }
          }
        }
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200
          },
          xaxis: {
            categories: collectedDataLimited.dates, // Show only the last 4 entries
            labels: {
              style: {
                fontSize: '6px'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontSize: '6px'
              }
            }
          },
          legend: {
            fontSize: '10px',
            markers: {
              size: 4
            }
          },
          noData: {
            text: 'No data available for this time frame.',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#0A3690',
              fontSize: '10px',
              fontFamily: 'sans-serif'
            }
          }
        }
      }
    ]
  };

  const barSpecificOptions: ApexOptions = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    stroke: {
      colors: ['transparent'],
      width: 5
    },
    colors: ['#0A3690', '#B9CDF4'],
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const lineSpecificOptions: ApexOptions = {
    markers: {
      shape: 'circle',
      size: 5
    },
    colors: ['#0A3690', '#02C9A8'],
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    }
  };

  const options = {
    ...commonOptions,
    ...(chartType === 'bar' ? barSpecificOptions : lineSpecificOptions)
  };

  return { series, options };
};

export function dateDiffInDays(dateTime1: string, dateTime2: string): number {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return diffInDays;
}

export function dateDiffInMonths(dateTime1: string, dateTime2: string): number {
  const date1 = new Date(dateTime1);
  const date2 = new Date(dateTime2);
  const yearsDiff = date2.getFullYear() - date1.getFullYear();
  const monthsDiff = date2.getMonth() - date1.getMonth();
  return yearsDiff * 12 + monthsDiff;
}
