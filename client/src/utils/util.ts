export const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024) {
        return sizeInBytes + " bytes";
    } else if (sizeInBytes < 1024 * 1024) {
        return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else {
        return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
};

export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const options: any = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
};