export const generateMembershipId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    return `IOT-${year}-${randomNum}`;
};
