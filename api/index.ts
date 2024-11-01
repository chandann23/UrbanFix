import {supabase} from "@/lib/supabase";
import {useQuery,useMutation} from "@tanstack/react-query";

export const useReportList = async () => {
  return useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const { data, error } = await supabase.from('reports').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertReport = () => {

return useMutation({
    async mutationFn(data:any) {
    const {data:newReport,error}=  await supabase.from('reports').insert({
        title : data.title,
        description:data.description,
        location:data.location,
        status:data.status,
        category:data.category,
        image_url:data.image_url,
      })
      .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  })

}
