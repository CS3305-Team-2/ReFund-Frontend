export const areaToCode = {
  'A - Future Networks & Communications': 'PRIORITY_AREA_A',
  'B - Data Analytics, Management, Security & Privacy': 'PRIORITY_AREA_B',
  'C - Digital Platforms, Content & Applications': 'PRIORITY_AREA_C',
  'D - Connected Health and Independent Living': 'PRIORITY_AREA_D',
  'E - Medical Devices': 'PRIORITY_AREA_E',
  'F - Diagnostics': 'PRIORITY_AREA_F',
  'G - Therapeutics: Synthesis, Formulation, Processing and Drug Delivery': 'PRIORITY_AREA_G',
  'H - Food for Health': 'PRIORITY_AREA_H',
  'I - Sustainable Food Production and Processing': 'PRIORITY_AREA_I',
  'J - Marine Renewable Energy': 'PRIORITY_AREA_J',
  'K - Smart Grids & Smart Cities': 'PRIORITY_AREA_K',
  'L - Manufacturing Competitiveness': 'PRIORITY_AREA_L',
  'M - Processing Technologies and Novel Materials': 'PRIORITY_AREA_M',
  'N - Innovation in Services and Business Processes': 'PRIORITY_AREA_N',
  'Software': 'SOFTWARE',
  'Other': 'OTHER'
};

export const codeToArea = (code) => ({
  'PRIORITY_AREA_A': 'A - Future Networks & Communications',
  'PRIORITY_AREA_B': 'B - Data Analytics, Management, Security & Privacy',
  'PRIORITY_AREA_C': 'C - Digital Platforms, Content & Applications',
  'PRIORITY_AREA_D': 'D - Connected Health and Independent Living',
  'PRIORITY_AREA_E': 'E - Medical Devices',
  'PRIORITY_AREA_F': 'F - Diagnostics',
  'PRIORITY_AREA_G': 'G - Therapeutics: Synthesis, Formulation, Processing and Drug Delivery',
  'PRIORITY_AREA_H': 'H - Food for Health',
  'PRIORITY_AREA_I': 'I - Sustainable Food Production and Processing',
  'PRIORITY_AREA_J': 'J - Marine Renewable Energy',
  'PRIORITY_AREA_K': 'K - Smart Grids & Smart Cities',
  'PRIORITY_AREA_L': 'L - Manufacturing Competitiveness',
  'PRIORITY_AREA_M': 'M - Processing Technologies and Novel Materials',
  'PRIORITY_AREA_N': 'N - Innovation in Services and Business Processes',
  'SOFTWARE': 'Software',
  'OTHER': 'Other', 
})[code];