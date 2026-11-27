import API from '@shared/api';
import type {
   DashboardServiceOptions,
   StatisticsByRegion,
   StatisticsComposition,
   StatisticsSummary,
} from '../types';
class Service extends API {
   getStatisticsByStatus(
      options: DashboardServiceOptions<StatisticsSummary> = {},
   ) {
      const { params, signal } = options;
      this.request(
         { params, signal, url: '/internal/statistics/summary/' },
         options,
      );
   }
   getStatisticsByRegions(
      options: DashboardServiceOptions<StatisticsByRegion[]> = {},
   ) {
      const { params, signal } = options;
      this.request(
         {
            params,
            signal,
            url: '/internal/statistics/by-region-with-districts/',
         },
         options,
      );
   }
   getStatisticsComposition(
      options: DashboardServiceOptions<StatisticsComposition> = {},
   ) {
      const { params, signal } = options;
      this.request(
         { params, signal, url: '/internal/statistics/composition/' },
         options,
      );
   }
}
const DashboardService = new Service();
export default DashboardService;
