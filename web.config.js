<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
    </handlers>

    <defaultDocument enabled="true">
      <files>
        <add value="index.js" />
      </files>
    </defaultDocument>
  </system.webServer>
</configuration>;
