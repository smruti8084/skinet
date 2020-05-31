namespace Core.Specifications
{
    public class ProductWithFilterForCountSpecification : BaseSpecification<Entities.Product>
    {
        public ProductWithFilterForCountSpecification(ProductSpecParams productParams)
        : base( x => 
                        (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) && 
                        (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) &&
                        (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
                      )
        {

        }
    }
}