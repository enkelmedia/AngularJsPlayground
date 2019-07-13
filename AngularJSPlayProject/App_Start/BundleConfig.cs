using System.Web;
using System.Web.Optimization;

namespace AngularJSPlayProject
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/lib") 
                .Include("~/Scripts/lib/angular.1.7.8.min.js") // we need angular first of everything.
                .IncludeDirectory("~/Scripts/lib/","*.js",true)
            );

            bundles.Add(new ScriptBundle("~/bundles/app")
                .IncludeDirectory("~/Scripts/App", "*.js", true));

            
            
            bundles.Add(new StyleBundle("~/Style/css").Include(
                      "~/Style/site.css"));
        }
    }
}
