Name: jaguar-portal
Version: 1.0
Release: 0.%{?checkout}
License: Unknown
Summary: Jaguar Web Portal
BuildRoot: %(mktemp -ud %{_tmppath}/%{name}-%{version}-%{release}-XXXXXX)

%description 
Jaguar Web Portal

%install
rm -rf %{buildroot}
mkdir -p %{buildroot}/etc/systemd/system
mkdir -p %{buildroot}/etc/jaguar/www
cp -a %{srcdir}/public %{buildroot}/etc/jaguar/www
cp -a %{srcdir}/server %{buildroot}/etc/jaguar/www
cp -a %{srcdir}/node_modules %{buildroot}/etc/jaguar/www
cp -a %{srcdir}/portal.service %{buildroot}/etc/systemd/system

%post
systemctl enable portal.service

%clean
rm -rf %{buildroot}


%files
%defattr(644,root,root,755)
/etc/systemd/system/portal.service
/etc/jaguar/www/public
/etc/jaguar/www/server
/etc/jaguar/www/node_modules
