"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import pinFileToIPFS from "../../lib/pinFileToIpfs";
import { ImagePlus, X } from "lucide-react";

interface Image {
  file: File;
  preview: string;
}

export default function CampaignCreation() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
    educationalInstitution: "",
    courseOfStudy: "",
    diploma: "",
    experience: "",
    fundingType: "",
    ipfsImages: [],
  });
  const [images, setImages] = useState<Image[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
        .slice(0, 5 - images.length)
        .map((file) => {
          return new Promise<Image>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                file,
                preview: reader.result as string,
              });
            };
            reader.readAsDataURL(file);
          });
        });

      Promise.all(newImages).then((resolvedImages) => {
        setImages((prevImages) =>
          [...prevImages, ...resolvedImages].slice(0, 5)
        );
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/campaigns/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      const data = await response.json();
      console.log("Campaign created successfully:", data);
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error("Error creating campaign:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Educational Crowdfunding Campaign</CardTitle>
          <CardDescription>
            Fill in the details to start your campaign and achieve your
            educational goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter your campaign title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your educational goals and why you're seeking funding"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaignImages">Campaign Images (Up to 5)</Label>
              <div className="flex flex-wrap items-center gap-4">
                <Input
                  id="campaignImages"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  className="hidden"
                  aria-describedby="imageHelp"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("campaignImages")?.click()
                  }
                  disabled={images.length >= 5}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={`Campaign image ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Funding Goal ($)</Label>
              <Input
                id="goal"
                name="goal"
                type="number"
                value={formData.goal}
                onChange={handleInputChange}
                placeholder="Enter your funding goal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Campaign Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationalInstitution">
                Educational Institution
              </Label>
              <Input
                id="educationalInstitution"
                name="educationalInstitution"
                value={formData.educationalInstitution}
                onChange={handleInputChange}
                placeholder="Enter the name of your school or university"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseOfStudy">Course of Study</Label>
              <Input
                id="courseOfStudy"
                name="courseOfStudy"
                value={formData.courseOfStudy}
                onChange={handleInputChange}
                placeholder="Enter your field of study"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diploma">Current or Intended Diploma</Label>
              <Input
                id="diploma"
                name="diploma"
                value={formData.diploma}
                onChange={handleInputChange}
                placeholder="E.g., Bachelor's in Computer Science, Master's in Education"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Relevant Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Describe any relevant educational or professional experience"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundingType">Funding Type</Label>
              <Select
                name="fundingType"
                onValueChange={(value) =>
                  handleSelectChange(value, "fundingType")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select funding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tuition">Tuition Fees</SelectItem>
                  <SelectItem value="living">Living Expenses</SelectItem>
                  <SelectItem value="materials">Study Materials</SelectItem>
                  <SelectItem value="research">Research Project</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Create Campaign
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
