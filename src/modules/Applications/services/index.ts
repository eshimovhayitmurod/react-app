import API from '@shared/api';
import type {
   Admission,
   AdmissionServiceOptions,
   EmployeeDetails,
   EmployeeServiceOptions,
   EmployeeType,
   PaginatedResponse,
} from '../types';
class Service extends API {
   // BASE

   getApplications(
      options: AdmissionServiceOptions<PaginatedResponse<Admission>> = {},
   ) {
      const { params, signal } = options;
      this.request({ params, signal, url: '/admissions/' }, options);
   }
   getApplication(options: AdmissionServiceOptions<Admission> = {}) {
      const { id, signal } = options;
      this.request({ signal, url: `/admissions/${id}/` }, options);
   }
   getApplicationsStatusCounts(
      options: AdmissionServiceOptions<Admission> = {},
   ) {
      const { signal } = options;
      this.request({ signal, url: `/admission-statuses/counts/` }, options);
   }

   // PPS

   createApplication(options: AdmissionServiceOptions<Admission> = {}) {
      const { data, headers } = options;
      this.request(
         { data, method: 'POST', url: '/pps/admissions/', headers },
         options,
      );
   }

   // DOCTOR

   getDoctorApplications(
      options: EmployeeServiceOptions<EmployeeDetails> = {},
   ) {
      const { signal, params } = options;
      this.request({ signal, url: '/doctor/admissions/', params }, options);
   }
   getDoctorApplication(options: EmployeeServiceOptions<EmployeeDetails> = {}) {
      const { id, signal } = options;
      this.request({ signal, url: `/doctor/admissions/${id}/` }, options);
   }
   getDoctorApplicationPhoto(
      options: EmployeeServiceOptions<EmployeeDetails> = {},
   ) {
      const { id, signal } = options;
      this.request({ signal, url: `/doctor/admissions/${id}/photo/` }, options);
   }
   placeCitizen(options: EmployeeServiceOptions<EmployeeType> = {}) {
      const { data, id } = options;
      this.request(
         { data, method: 'POST', url: `/doctor/admissions/${id}/place/` },
         options,
      );
   }
   closeCitizen(options: EmployeeServiceOptions<EmployeeType> = {}) {
      const { data, id } = options;
      this.request(
         { data, method: 'POST', url: `/doctor/admissions/${id}/close/` },
         options,
      );
   }
}
const ApplicationService = new Service();
export default ApplicationService;
