export interface IDashboardData {
    properties_count: IPropertiesCount;
    general_info: IGeneralInfo;
  }
  
  interface IPropertiesCount {
    count_stock: number;
    count_seller: number;
    count_total: number;
  }
  
  interface IGeneralInfo {
    total_sold: number;
    total_bought: number;
    profit_margin: number;
  }
  