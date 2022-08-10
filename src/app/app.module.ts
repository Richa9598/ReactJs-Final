import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
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
import { GalleryDirective } from './gallery.directive';
import { CarouselComponent } from './components/carousel/carousel.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ContactHomeComponent } from './components/contact-home/contact-home.component';
import { ContactHomeService } from './service/contact-home.service';
import { FeedbackComponent } from './components/feedback/feedback.component';

//module decorators
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    TestimonialsComponent,
    ContactComponent,
    AdminComponent,
    FavoritesComponent,
    GalleryComponent,
    AdminDestinationsComponent,
    AdminSitesComponent,
    AdminHotelsComponent,
    AdminTransportationsComponent,
    ListingsComponent,
    ListingDetailComponent,
    GalleryDirective,
    CarouselComponent,
    BookmarkComponent,
    LogoutComponent,
    ContactHomeComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbModule,
    CarouselModule,
    IconModule,
    HttpClientModule,
    BrowserAnimationsModule,
 

  ],
  providers: [IconSetService,ContactHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
