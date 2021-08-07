import DescriptionIcon from "@material-ui/icons/Description";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PhotoIcon from "@material-ui/icons/Photo";
import MovieIcon from "@material-ui/icons/Movie";
export const getFileExtension = (file_ext) => {
    const photo_extensions = [
        ".JPEG",
        ".JPG",
        ".PNG",
        ".GIFF",
        ".TIFF",
        ".PSD",
        ".RAW",
    ];
    const document_extensions = [
        ".doc",
        ".docx",
        ".pdf",
        ".json",
        ".txt",
        ".html",
        ".htm",
        ".odt",
        ".xls",
        ".xlsx",
        ".ods",
        ".ppt",
        ".pptx",
    ];
    const movie_extensions = [
        ".webm",
        ".mkv",
        ".flv",
        ".vob",
        ".ogv",
        ".ogg",
        ".drc",
        ".mng",
        ".avi",
        ".mts",
        ".m2ts",
        ".ts",
        ".mov",
        ".qt",
        ".wmv",
        ".yuv",
        ".rm",
        ".rmvb",
        ".viv",
        ".asf",
        ".amv",
        ".mp4",
        ".m4p",
        ".m4v",
        ".mpg",
        ".mp2",
        ".mpeg",
        ".mpe",
        ".mpv",
        ".m4v",
        ".svi",
        ".3gpp",
        ".3g2",
        ".mxf",
        ".roq",
        ".f4v",
        ".f4p",
        ".f4a",
        ".f4b",
    ];
    if (photo_extensions.includes(file_ext)) return <PhotoIcon />;
    else if (document_extensions.includes(file_ext)) return <DescriptionIcon />;
    else if (movie_extensions.includes(file_ext)) return <MovieIcon />;
    else return <InsertDriveFileIcon />;
};
export default getFileExtension;
