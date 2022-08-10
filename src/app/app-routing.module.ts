import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AdminDestinationsComponent } from './components/admin-destinations/admin-destinations.component';
import { AdminSitesComponent } from './components/admin-sites/admin-sites.component';
import { AdminHotelsComponent } from './components/admin-hotels/admin-hotels.component';
import { AdminTransportationsComponent } from './components/admin-transportations/admin-transportations.component';
import { ListingsComponent } from './components/listings/listings.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'gallery',component:GalleryComponent},
  {path:'testimonials',component:TestimonialsComponent},
  {path:'contact',component:ContactComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent,},
  {path:'favorites',component:FavoritesComponent},
  {path:'adminDestinations',component:AdminDestinationsComponent},
  {path:'adminSites',component:AdminSitesComponent},
  {path:'adminHotels',component:AdminHotelsComponent},
  {path:'adminTransportations',component:AdminTransportationsComponent},
  {path:'listings/:id', component:ListingsComponent},
  {path:'listingDetail/:id', component:ListingDetailComponent},
  {path:'bookmarks', component:BookmarkComponent},
  {path:'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule {
 }
