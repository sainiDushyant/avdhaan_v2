import { HesFilterPayload } from "@/store/hes/types/other";

type PriorityDataType = {
    priority: number,
    name: string,
}

export const priorityData: PriorityDataType[] = [
    {
        "priority": 5,
        "name": "site"
    },
    {
        "priority": 4,
        "name": "pss"
    },
    {
        "priority": 3,
        "name": "feeder"
    },
    {
        "priority": 2,
        "name": "dtr"
    },
    {
        "priority": 1,
        "name": "pole"
    }
]

export const filterData: HesFilterPayload = {
    "site": [
        "1",
        "2",
        "33",
        "34"
    ],
    "pss": [
        "1",
        "2",
        "33",
        "34"
    ],
    "feeder": [
        "1",
        "2",
        "3",
        "7",
        "8"
    ],
    "dtr": [
        "1",
        "2",
        "4",
        "7",
        "8"
    ],
    "pole": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6"
    ]
}

