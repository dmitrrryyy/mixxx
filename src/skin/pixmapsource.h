#ifndef PIXMAPSOURCE_H
#define PIXMAPSOURCE_H

// A class representing an image source for a pixmap
// A bundle of a file path, raw data or inline svg
class PixmapSource {
  public:
    PixmapSource();
    PixmapSource( QString filepath );
    virtual ~PixmapSource();

    bool isEmpty() const;
    bool isSVG() const;
    bool isBitmap() const;
    void setSVG( QByteArray content );
    void setPath( QString newPath );
    QString getPath() const;
    QByteArray getData() const;
    QString getId() const;
    
  private:
    enum Type {
        SVG,
        BITMAP
    };
    
    QString m_path;
    QByteArray m_baData;
    enum Type m_eType;
};

#endif /* PIXMAPSOURCE_H */
