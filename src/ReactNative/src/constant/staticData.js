export const businessCategoryModal = [
    { id: 1, category: "Food & Beverage" },
    { id: 2, category: "Entertainment" },
    { id: 3, category: "Retail" },
    { id: 4, category: "Gas" },
    { id: 5, category: "Travel" },
    { id: 6, category: "Grocery" },
];

export const tabs = [
    { id: 1, name: "Verifying" },
    { id: 2, name: "Collecting" },
];
export const verifyingFilterData = [
    { id: 1, name: "New" },
    { id: 3, name: "Verified" },
];
export const filterData = [
    { filter: "All" },
    { filter: "Verified" },
    { filter: "Pending" },
];

export const friendsTabs = [
    { id: 1, name: "Connected" },
    { id: 2, name: "Request" },
    { id: 3, name: "Recommendation" },
];

export const questions = [
    {
        id: 1,
        title: "Is there a trash can in view?",
        options: [
            { id: 1, title: "Yes", isTrue: true },
            { id: 2, title: "No", isTrue: false },
        ],
    },
    {
        id: 2,
        title: "How many items are they holding",
        options: [
            { id: 1, title: "1-3", isTrue: false },
            { id: 2, title: "4-7", isTrue: true },
            { id: 3, title: "10+", isTrue: false },
        ],
    },
];

export const categoryData = [
    {
        id: 1,
        tabTitle: "Food & Beverage",
    },
    {
        id: 2,
        tabTitle: "Entertainment",
    },
    {
        id: 3,
        tabTitle: "Retail",
    },
    {
        id: 4,
        tabTitle: "Gas",
    },
    {
        id: 5,
        tabTitle: "Travel",
    },
    {
        id: 6,
        tabTitle: "Grocery",
    },
];

export const pointsTab = [
    { id: 1, name: "Points History" },
    { id: 2, name: "Boost Points" },
];

export const vouchersTab = [
    { id: 1, name: "Used Vouchers" },
    { id: 2, name: "New Vouchers" },
];
