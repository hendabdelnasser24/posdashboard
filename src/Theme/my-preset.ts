import { definePreset, palette } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

export const MyLara = definePreset(Lara, {
  semantic: {
    primary: palette('{Blue}'), 
  }
});
