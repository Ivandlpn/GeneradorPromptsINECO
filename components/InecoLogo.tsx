import React from 'react';

interface InecoLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'grey';
}

// Update the color logo to use the official PNG URL, keeping variants for UI needs.
const logoDataUris = {
  color: 'https://www.ineco.com/ineco/sites/default/files/2022-12/Logo%20Ineco.png',
  white: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzUgMzUiIHdpZHRoPSIxMzUiIGhlaWdodD0iMzUiPjxzdHlsZT4uaW5lY28tdGV4dCB7IGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMzBweDsgZmlsbDogI0ZGRkZGRjsgfTwvc3R5bGU+PHRleHQgeD0iMCIgeT0iMjgiIGNsYXNzPSJpbmVjby1tZXh0Ij5pbmVjbzwvdGV4dD48cmVjdCB4PSIxMC41IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+',
  grey: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMzUgMzUiIHdpZHRoPSIxMzUiIGhlaWdodD0iMzUiPjxzdHlsZT4uaW5lY28tdGV4dCB7IGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMzBweDsgZmlsbDogI0NCRDVFMjsgfTwvc3R5bGU+PHRleHQgeD0iMCIgeT0iMjgiIGNsYXNzPSJpbmVjby1tZXh0Ij5pbmVjbzwvdGV4dD48cmVjdCB4PSIxMC41IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjQ0JENUUyIi8+PC9zdmc+',
};

export const InecoLogo: React.FC<InecoLogoProps> = ({ className, variant = 'color' }) => {
  const logoUrl = logoDataUris[variant];

  return (
    <img 
      src={logoUrl} 
      alt="Logo de Ineco" 
      className={className} 
    />
  );
};