import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import path from "path";

class SharpResize {
  constructor(
    file: Express.Multer.File,
    rootFolder: string,
    subFolder?: string,
    name?: string,
    width?: number,
    height?: number,
    ext?: keyof FormatEnum | AvailableFormatInfo
  ) {
    this.file = file;
    this.rootFolder = rootFolder;
    this.subFolder = subFolder;
    this.width = width;
    this.height = height;
    this.ext = ext;
    this.name = name || this.file.originalname.trim().replace(/\s/g, "-");
  }

  private sharper() {
    return sharp(this.file.path);
  }

  resize(width?: number, height?: number) {
    return this.sharper().resize(
      this.width || width || 1000,
      this.height || height || null
    );
  }

  reformat(format?: typeof this.ext, width?: number, height?: number) {
    return this.resize(width, height).toFormat(format || this.ext || "webp");
  }

  save(
    subFolder?: string,
    width?: number,
    height?: number,
    format?: typeof this.ext
  ) {
    this.subFolder = subFolder;
    this.reformat(format, width, height).toFile(
      path.join(
        `./${this.rootFolder}/${subFolder || this.subFolder || ""}`,
        this.name
      ),
      (err) => {
        if (err) return `Error resizing image ${err}`;
      }
    );
    this.paths.push(`/${this.subFolder || ""}/${this.name}`);
  }

  fullFilePath() {
    return this.paths;
  }

  private file;
  private height;
  private rootFolder;
  private subFolder;
  private width;
  private ext;
  private name;
  private paths: string[] = [];
}

export default SharpResize;
