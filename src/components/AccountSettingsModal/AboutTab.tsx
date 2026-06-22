import Box from "../Box/Box";
import { contributors, team } from "@/lib/contributors";
import DefaultMessage from "../DefaultMessage/DefaultMessage";
import { FileText, Hammer, Heart, Quote } from "lucide-react";

const AboutTab = () => {
  return (
    <>
      <h1><DefaultMessage id="settings.tab.about.header" /></h1>
      <p><DefaultMessage id="settings.tab.about.header.paragraph-1" /></p>
      <h2><Hammer /> <DefaultMessage id="settings.tab.about.team" /></h2>
      <p><DefaultMessage id="settings.tab.about.team.paragraph-1" /></p>
      <div className="grid grid-cols-2 mt-1">
        {team.map((member, index) => {
          return (
            <a key={index} className="active:*:scale-95 m-0.5" href={"https://github.com/" + member.github.username} target="_blank">
              <Box className="h-full p-1 rounded-2xl flex transition">
                <img className="rounded-full h-3.5 w-3.5 mr-1" src={"https://avatars.githubusercontent.com/u/" + member.github.id} alt={member.github.username} />
                <div>
                  <h2 className="mt-0 mb-0">{member.name ?? member.github.username}</h2>
                  {member.roles && (
                    <div>
                      {member.roles.map((role, index) => {
                        return (
                          <span key={index} className="outline outline-(--outline) text-[0.9rem] pl-0.5 pr-0.5 pt-[0.1rem] pb-[0.1rem] rounded-lg mr-0.5"><DefaultMessage id={`role.${role}`} /></span>
                        );
                      })}
                    </div>
                  )}
                  {member.quote && (
                    <p className="text-(--sub) italic"><Quote className="scale-90" /> {member.quote}</p>
                  )}
                </div>
              </Box>
            </a>
          );
        })}
      </div>
      <h2><Heart /> <DefaultMessage id="settings.tab.about.contributors" /></h2>
      <p><DefaultMessage
        id="settings.tab.about.contributors.paragraph-1"
        values={{
          link: (
            <a href="https://github.com/raynepaws/weathercord" className="link" target="_blank"><DefaultMessage id="settings.tab.about.contributors.paragraph-1.link-1" /></a>
          )}}
      /></p>
      <div className="grid grid-cols-2 mt-1">
        {contributors.map((contributor, index) => {
          return (
            <a key={index} className="active:*:scale-95 m-0.5" href={"https://github.com/" + contributor.github.username} target="_blank">
              <Box className="h-full p-1 rounded-2xl flex transition">
                <img className="rounded-full h-3.5 w-3.5 mr-1" src={"https://avatars.githubusercontent.com/u/" + contributor.github.id} alt={contributor.github.username} />
                <div>
                  <h2 className="mt-0 mb-0">{contributor.name ?? contributor.github.username}</h2>
                  {contributor.quote && (
                    <p className="text-(--sub) italic"><Quote className="scale-90" /> {contributor.quote}</p>
                  )}
                </div>
              </Box>
            </a>
          );
        })}
      </div>
      <h2><FileText /> License</h2>
      <p>Weathercord uses the GNU Affero General Public License v3.0. Read the full text <a className="link" href="https://github.com/raynepaws/weathercord/blob/master/LICENSE">here</a>.</p>
    </>
  );
};

export default AboutTab;
