import { useState, useEffect } from "react";
import { Affiliate, searchAffiliate } from "@/entities";
import { toast } from "sonner";
import { AffiliateHttpRepository } from "../repositories";
import { httpClient } from "@/http";


export const useAffiliate = (params: searchAffiliate | null) => {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = new AffiliateHttpRepository(httpClient);

  useEffect(() => {
    if (params === null) return;
    const fetchAffiliate = async () => {
      setLoading(true);
      try {
        const data = await repository.getAffiliateByDocument(params);
        if (!data) {
          toast.warning("Afiliado no encontrado, debe crearlo");
          setAffiliate(null);
        } else {
          setAffiliate(data);
        }
      } catch (err: any) {
        toast.error(err.response.data.message);
        setError("Error al obtener afiliado");
      } finally {
        setLoading(false);
      }
    };

    if (params) fetchAffiliate();
  }, [params]);

  return { affiliate, loading, error };
};
